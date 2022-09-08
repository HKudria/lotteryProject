<?php

namespace Controller;

use Exception;
use Repository\LotteryPresentRepository;
use Repository\LotteryRepository;
use Repository\TokenRepository;

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
        $lottery = $this->getAllLotteries();
        $countOfPrize = $this->lotteryPresentRepository->countNotUsedPrize($lottery[0]['id']);
        $result = [];
        $result['token'] = $lottery[0]['token'];
        $result['count'] = $countOfPrize['prize'];
        return $result;
    }

    function generateToken(?string $nickName = null): array|string
    {
        try {
            return $this->tokenRepository->generateUserToken($nickName);
        } catch (Exception $e) {
            return 'Generate user token error';
        }
    }
}