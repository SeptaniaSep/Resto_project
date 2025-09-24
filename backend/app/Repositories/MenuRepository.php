<?php
namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class MenuRepository
{
    public function show()
    {
        return DB::table('menus')->get();
    }

    public function getById($id)
    {
      return DB::table('menus')->where('id', $id)->first();  
    }
    
    public function create($data)
    {
         return DB::table('menus')->insertGetId($data);
    }

    public function update($id, $data)
    {
        return DB::table('menus')->where('id', $id)->update($data);
    }

    public function delete($id)
    {
        return DB::table('menus')->where('id', $id)->delete();
    }

}