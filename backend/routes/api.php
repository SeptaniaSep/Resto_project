<?php

use App\Http\Controllers\AccessFeatureController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ListOrderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TableListController;
use App\Http\Controllers\UserRoleController;
use App\Http\Middleware\FeatureMiddleware;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function(){
    Route::post('/register', [AuthController::class, 'register'])->name('register.user');
    Route::post('/login', [AuthController::class, 'login'])->name('login.user');
    
    Route::get('/tablelist', [TableListController::class,'getTableList'])->name('table.list');

    Route::middleware([JwtMiddleware::class])->group(function (){ 
        Route::middleware([FeatureMiddleware::class.':roles'])->group(function () {
            Route::get('/role', [RoleController::class, 'getRole'])->name('get.roles');
            Route::post('/role', [RoleController::class, 'createRole'])->name('create.role');
            Route::put('/role/{id}', [RoleController::class, 'updateRole'])->name('update.role');
            Route::delete('/role/{id}', [RoleController::class, 'deleteRole'])->name('delete.role');
        });
        
        Route::middleware([FeatureMiddleware::class.':userrole'])->group(function(){
            Route::get('/user-role', [UserRoleController::class, 'getUserRole'])->name('get.user-role');
            Route::post('/user-role', [UserRoleController::class, 'createUserRole'])->name('create.user-role');
            Route::put('/user-role/{id}', [UserRoleController::class, 'updateUserRole'])->name('update.user-role');
            Route::delete('/user-role/{id}', [UserRoleController::class, 'deleteUserRole'])->name('delete.user-role');
        });
    
         Route::middleware([FeatureMiddleware::class.':permission'])->group(function(){
            Route::get('/permission', [PermissionController::class, 'getPermission'])->name('get.permission');
            Route::post('/permission', [PermissionController::class, 'createPermission'])->name('create.permission');
            Route::put('/permission/{id}', [PermissionController::class, 'updatePermission'])->name('update.permission');
            Route::delete('/permission/{id}', [PermissionController::class, 'deletePermission'])->name('delete.permission');
         });
         
         Route::middleware([FeatureMiddleware::class.':accessfeature'])->group(function(){
            Route::get('/access-feature', [AccessFeatureController::class, 'getAccessFeature'])->name('get.access-feature');
            Route::post('/access-feature', [AccessFeatureController::class, 'createAccessFeature'])->name('create.access-feature');
            Route::put('/access-feature/{id}', [AccessFeatureController::class, 'updateAccessFeature'])->name('update.access-feature');
            Route::delete('/access-feature/{id}', [AccessFeatureController::class, 'deleteAccessFeature'])->name('delete.access-feature');
         });

         Route::middleware([FeatureMiddleware::class.':tablelist'])->group(function () {
            Route::get('/tablelist/{id}', [TableListController::class, 'getTableListById'])->name('get.table-list.byId');
            Route::put('/tablelist/{id}', [TableListController::class, 'putTableListById'])->name('put.table-list.byId');
         });
         
         Route::middleware([FeatureMiddleware::class.':menu'])->group(function () {
             Route::get('/menu', [MenuController::class, 'index']);
             Route::get('/menu/{id}', [MenuController::class, 'show']);
             Route::post('/menu', [MenuController::class, 'store']);
             Route::put('/menu/{id}', [MenuController::class, 'update']);
             Route::delete('/menu/{id}', [MenuController::class, 'destroy']);
        });
            
         Route::middleware([FeatureMiddleware::class.':listorder'])->group(function () {
             Route::get('/list-order', [ListOrderController::class, 'index']);
             Route::get('/list-order/{id}', [ListOrderController::class, 'show']);
             Route::post('/list-order', [ListOrderController::class, 'create']);
        });
    });
});