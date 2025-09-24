<?php
namespace App\Repositories;

use App\Helpers\ApiResponse;
use Exception;
use Illuminate\Support\Facades\DB;

class TableListRepository
{
    public function show()
    {
          $result = DB::table('tablelist as tl')
            ->selectRaw('
                SUM(CASE WHEN tl.status = "available" THEN 1 ELSE 0 END) AS available,
                SUM(CASE WHEN tl.status = "occupied" THEN 1 ELSE 0 END) AS occupied,
                SUM(CASE WHEN tl.status = "reserved" THEN 1 ELSE 0 END) AS reserved,
                SUM(CASE WHEN tl.status = "inactive" THEN 1 ELSE 0 END) AS inactive
            ')
            ->first();

        $listtable = DB::table('tablelist')->get();

        return [
            'table_list' => $listtable,
            'quick_stats' => $result,
        ];
    }

    public function getById($id)
    {
        $data = DB::table('list_order')
        ->where('table_number', $id)
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
        
    }

    public function update($data, $id)
    {
        DB::beginTransaction();
        try{    
            $table = DB::table('tablelist')->where('table_number', $id)->first();

            if ($table && $table->status !== $data['status']) {
                DB::table('tablelist')
                    ->where('table_number', $id)
                    ->update(['status' => $data['status']]);
            }
            $newStatus = ($data['status'] === 'Available') ? 'Selesai' : $data['status'];
           DB::table('list_order')
                ->where('status', '!=', 'Selesai')
                ->where('table_number', $id)
                ->update(['status' => $newStatus]);;
                
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            return ApiResponse::somethingwentwrong('Something went wrong');
        }
    }

    public function delete($id)
    {

    }

}