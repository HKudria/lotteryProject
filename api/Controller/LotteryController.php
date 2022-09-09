<?php

namespace Controller;

use Exception;
use Repository\LotteryPresentRepository;
use Repository\LotteryRepository;
use Repository\TokenRepository;
use Controller\UserTokenController;
use Repository\PrizeLogRepository;

class LotteryController
{
    private readonly LotteryRepository $lotteryRepository;
    private LotteryPresentRepository $lotteryPresentRepository;
    private TokenRepository $tokenRepository;


    public function __construct()
    {
        $this->lotteryPresentRepository = new LotteryPresentRepository();
        $this->lotteryRepository = new LotteryRepository();
        $this->tokenRepository = new TokenRepository();
    }

    function createLottery(int $presentCount, int $boxCount, string $description): array|string
    {
        if ($presentCount > 0 && $boxCount > $presentCount) {
            try {
                return $this->lotteryRepository->createLottery($presentCount, $boxCount, $description);
            } catch (Exception $e) {
                return 'Generate token error';
            }
        }

        return 'Error - create lottery';
    }

    function createPresent(int $lotteryId, array $presents): string|array
    {
        if ($lotteryId && $presents) {
            $lottery = $this->lotteryRepository->selectLotteryById($lotteryId);
            return $this->lotteryPresentRepository->createPresent($lottery, $presents);
        }
        return 'Send data in empty';
    }

    function getAllLotteries(): string|array
    {
        return $this->lotteryRepository->getAllLottery() ?: 'Getting lottery list error';
    }

    function setActiveLottery(int $id): array
    {
        return $this->lotteryRepository->activateLottery($id);
    }

    function getActiveLottery(): array
    {
        $error['error'] = true;
        $lottery = $this->lotteryRepository->getActiveLottery();

        if($lottery){
            $countOfPrize = $this->lotteryPresentRepository->countNotUsedPrize($lottery['id']);

            if($countOfPrize['prize'] === 0){
                return $error;
            }
            $result = [];
            $result['token'] = $lottery['token'];
            $result['boxCount'] = $lottery['box_count'];
            $result['availablePresentCount'] = $countOfPrize['prize'];
            return $result;
        }

        return $error;

    }

    function generateToken(?string $nickName = null): array|string
    {
        try {
            return $this->tokenRepository->generateUserToken($nickName);
        } catch (Exception $e) {
            return 'Generate user token error';
        }
    }

    function disactivateLottery(): array{
       return $this->lotteryRepository->disactivateLottery();
    }

    function checkPrize(string $lotteryToken, string $authToken,  int $prizeId) : array{
       $userToken = new UserTokenController();
       $prizeController = new PrizeLogController();
       if(isset($userToken->checkUserToken($authToken)['token'])){
           $userToken->makeTokenUsed($authToken);
           $prizeController->setPrizeOpened($lotteryToken, $prizeId);
           $lottery = $this->lotteryRepository->selectLotteryByToken($lotteryToken);
           $checkWin = $this->lotteryPresentRepository->checkWin($lottery['id'],$prizeId);
           if ($checkWin){
               $getUser = $this->tokenRepository->getTokenByToken($authToken);
               $this->lotteryPresentRepository->setWinUser($getUser['id'],$prizeId);
               $prize = $checkWin['name'];
               return ['message' => "Congratulation! You won: $prize"];

           } else {
               return ['message' => 'Ohh.. You lucky next time!'];
           }
       }
           return ['message' => 'Token was used early'];
    }
}