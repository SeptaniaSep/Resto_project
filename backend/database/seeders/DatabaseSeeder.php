<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
    * Seed the application's database.
    */
    public function run(): void
    {
        DB::table('roles')->delete();
        DB::table('roles')->insert([
            ['id' => 1, 'name' => 'Admin', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Kasir', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Pelayan', 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('permissions')->delete();
        DB::table('permissions')->insert([
            ['id' => 1, 'features' => 'roles', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'features' => 'permission', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'features' => 'accessfeature', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'features' => 'userrole', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'features' => 'tablelist', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'features' => 'menu', 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'features' => 'listorder', 'created_at' => now(), 'updated_at' => now()],
        ]);
        
        DB::table('users')->delete();
        DB::table('users')->insert([
            [
                'id' => 1,
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Kasir User',
                'email' => 'kasir@example.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Pelayan User',
                'email' => 'pelayan@example.com',
                'password' => Hash::make('password123'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('user_roles')->delete();
        DB::table('user_roles')->insert([
            ['id' => 1, 'user_id' => 1, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'user_id' => 2, 'role_id'=> 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'user_id' => 3, 'role_id'=> 3, 'created_at' => now(), 'updated_at' => now()],
        ]);
        
        DB::table('acl_features')->delete();
        DB::table('acl_features')->insert([
            ['id' => 1, 'permission_id' => 1, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'permission_id' => 2, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'permission_id' => 3, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'permission_id' => 4, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'permission_id' => 5, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'permission_id' => 5, 'role_id'=> 2, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'permission_id' => 5, 'role_id'=> 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'permission_id' => 6, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'permission_id' => 6, 'role_id'=> 3, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'permission_id' => 7, 'role_id'=> 1, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 11, 'permission_id' => 7, 'role_id'=> 3, 'created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('tablelist')->delete();
        DB::table('tablelist')->insert([
            ['id' => 1, 'table_number' => 1, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'table_number' => 2, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'table_number' => 3, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'table_number' => 4, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'table_number' => 5, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'table_number' => 6, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'table_number' => 7, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'table_number' => 8, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'table_number' => 9, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'table_number' => 10, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 11, 'table_number' => 11, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 12, 'table_number' => 12, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 13, 'table_number' => 13, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 14, 'table_number' => 14, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
            ['id' => 15, 'table_number' => 15, 'status'=> 'available','created_at' => now(), 'updated_at' => now()],
        ]);

        DB::table('menus')->delete();
        DB::table('menus')->insert([
            // Makanan
            ['id' => 1, 'name' => 'Nasi Goreng Spesial', 'description' => 'Nasi goreng dengan telur, ayam, dan sambal', 'price' => 25000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 2, 'name' => 'Mie Goreng', 'description' => 'Mie goreng dengan sayuran dan ayam', 'price' => 22000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 3, 'name' => 'Ayam Bakar', 'description' => 'Ayam bakar dengan sambal terasi', 'price' => 30000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 4, 'name' => 'Sate Ayam', 'description' => 'Sate ayam dengan bumbu kacang', 'price' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 5, 'name' => 'Burger Keju', 'description' => 'Burger dengan daging sapi dan keju lezat', 'price' => 35000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 6, 'name' => 'Pizza Margherita', 'description' => 'Pizza dengan saus tomat dan mozzarella', 'price' => 50000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 7, 'name' => 'Spaghetti Bolognese', 'description' => 'Spaghetti dengan saus bolognese yang kaya rasa', 'price' => 45000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 8, 'name' => 'Dimsum', 'description' => 'Dimsum kukus dengan isi ayam atau udang', 'price' => 28000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 9, 'name' => 'Taco', 'description' => 'Taco dengan daging sapi, selada, dan saus pedas', 'price' => 27000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 10, 'name' => 'Nasi Campur', 'description' => 'Nasi putih dengan lauk lengkap: ayam, telur, dan sambal', 'price' => 24000, 'created_at' => now(), 'updated_at' => now()],

            // Minuman
            ['id' => 11, 'name' => 'Es Teh Manis', 'description' => 'Teh manis dingin dengan es batu', 'price' => 10000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 12, 'name' => 'Es Jeruk', 'description' => 'Jus jeruk segar dengan es batu', 'price' => 12000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 13, 'name' => 'Kopi Hitam', 'description' => 'Kopi hitam tanpa gula, disajikan panas', 'price' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 14, 'name' => 'Cappuccino', 'description' => 'Kopi dengan susu dan foam, disajikan panas', 'price' => 22000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 15, 'name' => 'Latte', 'description' => 'Kopi dengan susu panas, lembut dan creamy', 'price' => 22000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 16, 'name' => 'Es Kopi Susu', 'description' => 'Kopi susu manis dengan es batu', 'price' => 18000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 17, 'name' => 'Jus Alpukat', 'description' => 'Jus alpukat dengan susu kental manis', 'price' => 25000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 18, 'name' => 'Milkshake Coklat', 'description' => 'Milkshake coklat dengan es krim vanila', 'price' => 30000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 19, 'name' => 'Es Kelapa Muda', 'description' => 'Air kelapa muda segar dengan es batu', 'price' => 17000, 'created_at' => now(), 'updated_at' => now()],
            ['id' => 20, 'name' => 'Smoothie Mangga', 'description' => 'Smoothie mangga segar dengan yogurt', 'price' => 22000, 'created_at' => now(), 'updated_at' => now()],
        ]);

    }
}