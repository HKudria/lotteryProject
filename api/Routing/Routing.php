<?php

namespace Routing;

use Controller\AuthController;
use Controller\LotteryController;
use Controller\UserTokenController;

class Routing
{
    private array|string|null $data;
    private LotteryController $lotteryController;
    private AuthController $authController;
    private UserTokenController $userTokenController;

    public function __construct(array|string|null $data)
    {
        $this->data = $data;
        $this->lotteryController = new LotteryController();
        $this->authController = new AuthController();
        $this->userTokenController = new UserTokenController();
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
            'generateToken' => $this->lotteryController->generateToken($data['nick'] ?? null),
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
            'createPresent' => $this->lotteryController->createPresent($this->data['lottery_id'], $this->data['presents']),
            'getAllList' => $this->lotteryController->getAllLotteries(),
            default => 'Wrong request',
        };
    }
}

