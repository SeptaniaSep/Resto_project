<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use App\Services\ListOrderService;
use Illuminate\Http\Request;

class ListOrderController extends Controller
{
    protected $service;

    public function __construct(ListOrderService $service)
    {
        $this->service = $service;   
    }
    public function index()
    {
       return $this->service->getAllListOrder();
    }

    public function show($id)
    {
        return $this->service->getListOrderById($id);
    }

    public function create(Request $request)
    {
        $request->validate([
            'table_number' => 'required|integer',
            'status' => 'required|string|max:255',
            'orders' => 'required|array|min:1',
            'orders.*.name' => 'required|string|max:255',
            'orders.*.qty' => 'required|integer|min:1',
            'orders.*.price' => 'required|string|min:1', 
        ]);
        if (empty($request->orders)) {
            return ApiResponse::somethingwentwrong('Orders are missing or empty');
        }
        
        return $this->service->createListOrder($request->all());
    }
}