<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Closure;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         $token = $request->bearerToken();

        if (!$token) {
            return ApiResponse::unauthorized('Unauthorized, Token not provided');
        }

        try {
            $credentials = JWT::decode($token, new Key(env('JWT_SECRET'), 'HS256'));

            // Tambahkan data user ke request
            $request->merge([
                'user_id' => $credentials->sub,
                'role' => $credentials->roles,
            ]);
            
        } catch (Exception $e) {
            return ApiResponse::unauthorized('Invalid or expired token');
        }

        return $next($request);
    }
}