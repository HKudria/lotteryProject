<?php

namespace Routing;

use Controller\AuthController;
use Controller\LotteryController;
use Controller\UserTokenController;
use Controller\PrizeLogController;

class Routing
{
    private array|string|null $data;
    private LotteryController $lotteryController;
    private AuthController $authController;
    private UserTokenController $userTokenController;
    private PrizeLogController $prizeLogController;

    public function __construct(array|string|null $data)
    {
        $this->data = $data;
        $this->lotteryController = new LotteryController();
        $this->authController = new AuthController();
        $this->userTokenController = new UserTokenController();
        $this->prizeLogController = new PrizeLogController();
    }

    function adminRouting(): string|array
    {
        return match ($this->data['route']) {
            'createLottery' => $this->lotteryController->createLottery($this->data['present_count'], $this->data['box_count'],
                $this->data['description']),
            'createPresent' => $this->lotteryController->createPresent($this->data['lottery_id'], $this->data['presents']),
            'getAllList' => $this->lotteryController->getAllLotteries(),
            'activateLottery' => $this->lotteryController->setActiveLottery($this->data['lottery_id']),
            'getActiveLottery' => $this->lotteryController->getActiveLottery(),
            'generateToken' => $this->lotteryController->generateToken($this->data['nick'] ?? null),
            'disActivateLottery' => $this->lotteryController->disactivateLottery(),
            'userList' => $this->lotteryController->selectUerList($this->data['dayLimit']),
            default => 'Wrong request',
        };
    }

    function authRouting(): string|array
    {
        return ["auth" => true];
    }

    function userRouting(): string|array
    {
        return match ($this->data['route']) {
            'checkToken' => $this->userTokenController->checkUserToken($this->data['token']),
            'getActiveLottery' => $this->lotteryController->getActiveLottery(),
            'getOpenedBox' => $this->lotteryController->getOpenedBox($this->data['token']),
            'checkPrize' => $this->lotteryController->checkPrize($this->data['lottery_token'], $this->data['user_token'], $this->data['id']),
            default => 'Wrong request',
        };
    }
}

