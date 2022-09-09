<?php

namespace Controller;

use Repository\PrizeLogRepository;

class PrizeLogController{

    private PrizeLogRepository $prizeLogRepository;

    public function __construct()
    {
        $this->prizeLogRepository = new PrizeLogRepository();
    }

    function getOpenedBox(string $token):array|bool{
        return $this->prizeLogRepository->getOpenedBox($token);
    }

    function setPrizeOpened(string $token, int $id): bool{
        return $this->prizeLogRepository->setPrizeOpened($token, $id);
    }
}