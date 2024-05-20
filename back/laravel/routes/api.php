<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MapController;
use App\Http\Controllers\SaveController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportedMapsController;

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
Route::get('/mapsByDifficulty/{difficulty}', [MapController::class, 'mapsByDifficulty']);
Route::get('download/{id}', [MapController::class, 'download']);
Route::get('/defaultMaps', [MapController::class, 'getDefaultMaps']);
Route::get('/randomMaps', [MapController::class, 'getRandomMaps']);


Route::get('/saves', [SaveController::class, 'index']);
Route::get('/saves/{save}', [SaveController::class, 'show']);
Route::post('/saves', [SaveController::class, 'store']);
Route::put('/saves/{save}', [SaveController::class, 'update']);
Route::delete('/saves/{save}', [SaveController::class, 'destroy']);
Route::get('/savesByUser/{user}', [SaveController::class, 'getSavesByUser']);

Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{user}', [UserController::class, 'show']);
Route::get('/allUsers', [UserController::class, 'showAllUsers']);
Route::post('/users', [UserController::class, 'store']);
Route::put('/users/{user}', [UserController::class, 'update']);
Route::delete('/users/{user}', [UserController::class, 'destroy']);

Route::get('/reportedMaps', [ReportedMapsController::class, 'index']);
Route::get('/reportedMaps/{reportedMap} ', [ReportedMapsController::class, 'show']);
Route::post('/reportedMaps', [ReportedMapsController::class, 'store']);
Route::delete('/reportedMaps/{reportedMap}', [ReportedMapsController::class, 'destroy']);
Route::get('/reportedMapsByUser/{user}', [ReportedMapsController::class, 'getReportedMapsByUser']);

// Public routes
Route::post('/login', [UserController::class, 'login']);
Route::post('/register', [UserController::class, 'store']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    //users
    Route::post('/logout', [UserController::class, 'logout']);
    //maps
    Route::post('/maps', [MapController::class, 'store']);
    Route::put('/maps/{map}', [MapController::class, 'update']);
    Route::delete('/maps/{map}', [MapController::class, 'destroy']);
});
