<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\TableListRepository;

class TableListService
{
    protected $repo;

    public function __construct(TableListRepository $repo)
    {
        $this->repo = $repo;
    }
    public function getTableList()
    {
       return ApiResponse::success($this->repo->show(), 'Successfully', 201);
    }

    public function getTableListById($id)
    {
        return ApiResponse::success($this->repo->getById($id), 'Successfully', 201);
    }
    public function putTableListById($request,$id)
    {
        return ApiResponse::success($this->repo->update($request,$id), 'Successfully', 201);
    }
    
}