<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)

    {
        $fullUserInfo = DB::table('users')->where('id', $request->route('userID'))->first();
        if ($fullUserInfo === null) {
            return response()->json(['error' => 'user not found'], 404);
        }

        if ($fullUserInfo->admin != 1 || $fullUserInfo->id != auth('sanctum')->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
