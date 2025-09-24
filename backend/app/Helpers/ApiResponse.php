<?php

namespace App\Helpers;

use DateTime;

class ApiResponse
{
    public static function success($data=null, $message = 'Success', $status = 200)
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'data' => $data,
            'time_stamp' => new DateTime(),
        ]);
        
    }

    public static function error($message = 'Error', $status = 400, $errors = [])
    {
        return response()->json([
            'status' => $status,
            'message' => $message,
            'errors' => $errors,
            'time_stamp' => new DateTime(),
        ]);
    }
    
    
    public static function badRequest($message = 'Bad Request')
    {
        return self::error($message, 400);
    }

    public static function unauthorized($message = 'Unauthorized')
    {
        return self::error($message, 401);
    }

    public static function forbidden($message = 'Forbidden')
    {
        return self::error($message, 403);
    }
    
    public static function notFound($message = 'Not Found')
    {
        return self::error($message, 404);
    }
    public static function somethingwentwrong($message = 'Something went wrong')
    {
        return self::error($message, 500);
    }

}