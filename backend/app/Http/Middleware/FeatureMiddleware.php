<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class FeatureMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $feature): Response
    {
        try{
            $role = $request->get('role');
            $roleNames = 
                DB::table('acl_features as af')
                    ->leftJoin('permissions as p', 'af.permission_id', '=', 'p.id')
                    ->leftJoin('roles as r', 'r.id', '=', 'af.role_id')
                    ->where('p.features', $feature)
                    ->pluck('r.name')
                    ->toArray();
                                        
            if (empty($roleNames)) {
                return ApiResponse::notFound("Feature not found");
            }

            if (!in_array($role[0], $roleNames)) {
                return ApiResponse::unauthorized('You are not authorized to access this feature.');
            }
        } catch (Exception $e) {
            return ApiResponse::unauthorized('Unauthorized access');
        }
        return $next($request);
    }
}