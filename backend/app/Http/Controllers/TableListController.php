<?php

namespace App\Http\Controllers;

use App\Services\TableListService;
use Illuminate\Http\Request;

class TableListController extends Controller
{
    protected $service;

    public function __construct(TableListService $service)
    {
        $this->service = $service;   
    }

    public function getTableList()
    {
        return $this->service->getTableList();
    }

    public function getTableListById($id)
    {
        return $this->service->getTableListById($id);
    }

    public function putTableListById(Request $request, $id)
    {
        return $this->service->putTableListById($request, $id);
    }
}