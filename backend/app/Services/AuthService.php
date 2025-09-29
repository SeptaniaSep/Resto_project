<?php

namespace App\Services;

use App\Helpers\ApiResponse;
use App\Repositories\AuthRepository;
use App\Repositories\RoleRepository;
use Firebase\JWT\JWT;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    protected $repo;
    protected $roleRepo;
    protected $key;
    
    public function __construct(AuthRepository $repo, RoleRepository $roleRepo)
    {
        $this->repo = $repo;
        $this->roleRepo = $roleRepo;
        $this->key = env('JWT_SECRET', 'mysecretkey');    
    }

    public function register($data)
    {
        $response = $this->repo->create($data);

        if (isset($response['status']) && $response['status'] === 'error') {
            return ApiResponse::error(
                $response['message'],
                $response['code']
            );
        }
        return ApiResponse::success($response, 'Register Successfully', 201);
    }

    public function login($data)
    {
    $user = $this->repo->getUsersByEmail($data['email']); 
    
    if (!$user || !Hash::check($data['password'], $user->password)) {
        return ApiResponse::unauthorized('Email or Password Wrong!');
    }

    $roles = $this->roleRepo->getRoles($user->id);

    $payload = [
        'iss' => 'resto-app',   // issuer
        'sub' => $user->id,          // subject (user ID)
        'roles' => $roles,           // roles
        'iat' => time(),             // issued at
        'exp' => time() + 86400      // expiration time (1 day)
    ];

    $jwt = JWT::encode($payload, $this->key, 'HS256');

    // Return success response with token and user data
    return ApiResponse::success([
        'token' => $jwt,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'roles' => $roles
        ]
    ], 'Login berhasil');
}
}