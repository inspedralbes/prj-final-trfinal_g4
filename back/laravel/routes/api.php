<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportedMapsController;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/maps', [MapController::class, 'index']);
Route::get('/maps/{map}', [MapController::class, 'getMap']);
Route::post('/maps', [MapController::class, 'store']);


Route::get('/mapsByDifficulty/{difficulty}', [MapController::class, 'mapsByDifficulty']);
Route::get('/defaultMaps', [MapController::class, 'getDefaultMaps']);
Route::get('/randomMaps', [MapController::class, 'getRandomMaps']);

// Community routes
Route::get('/mapsCommunity/{difficulty}', [MapController::class, 'mapsCommunity']);
Route::get('/mapsCommunity', [MapController::class, 'mapsCommunityAll']);
Route::get('/searchMapsCommunity/{sentence}', [MapController::class, 'searchMaps']);
Route::post('/mapsCommunity/like', [MapController::class, 'addLike']);
Route::post('/mapsCommunity/dislike', [MapController::class, 'removeLike']);
Route::post('/reportedMaps', [ReportedMapsController::class, 'store']);

Route::get('/users/{user}', [UserController::class, 'show']);
Route::post('/users', [UserController::class, 'store']);


Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    //users
    Route::post('/users', [UserController::class, 'update']);
    Route::post('/logout', [UserController::class, 'logout']);
});

Route::middleware('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/reportedMaps', [ReportedMapsController::class, 'index']);
    Route::get('/reportedMaps/{reportedMap} ', [ReportedMapsController::class, 'show']);
    Route::delete('/reportedMaps/{reportedMap}', [ReportedMapsController::class, 'destroyReport']);
    Route::get('/reportedMapsByUser/{user}', [ReportedMapsController::class, 'getReportedMapsByUser']);
    Route::get('/reportedReasons', [ReportedMapsController::class, 'getReportedReason']);
    Route::get('/savesByUser/{user}', [SaveController::class, 'getSavesByUser']);
    Route::get('download/{id}', [MapController::class, 'download']);
    Route::post('/maps/{map}', [MapController::class, 'update']);
    Route::delete('/maps/{map}', [MapController::class, 'destroy']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});
