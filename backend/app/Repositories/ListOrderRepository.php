<?php
namespace App\Repositories;

use App\Helpers\ApiResponse;
use Exception;
use Illuminate\Support\Facades\DB;

class ListOrderRepository
{
    public function show()
    {
        return DB::table('list_order')->get();
    }

    public function getById($id)
    {
        $data = DB::table('list_order')
        ->where('id_order', $id)
        ->where('status', '!=', 'Selesai')
        ->get();

        $total = $data->sum('price'); 

        return [
            'data' => $data,
            'total' => $total * 1000
        ];
    }
    
    public function create($data)
    {
        DB::beginTransaction();
        try {
            $updated = DB::table('tablelist')
                ->where('table_number', $data['table_number'])
                ->update(['status' => $data['status']]);

            if ($updated === 0) {
                return ApiResponse::somethingwentwrong('Table number not found or no changes made.');
            }
                        
            
            $orderId = "Order-table" . $data['table_number'] . now()->format('YmdHis');
            
            foreach ($data['orders'] as $order) {
                DB::table('list_order')->insert([
                    'id_order' => $orderId,
                    'name' => $order['name'],
                    'qty' => $order['qty'],
                    'price' => $order['price'], 
                    'table_number' => $data['table_number'],
                    'status' => $data['status'],
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }
            
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::somethingwentwrong('Order creation failed: ' . $e->getMessage() );
        }
    }

    public function update($id)
    {

    }

    public function delete($id)
    {

    }

}