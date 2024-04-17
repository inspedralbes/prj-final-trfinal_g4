<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;

class MapController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Map::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function getDifficulty($request)
    {
        return Map::where('difficulty', $request->difficulty)->get();
    }

    public function getMap($request)
    {
        return Map::find($request->id);
    }

    public function getMapsByUser($request)
    {
        return Map::where('user_id', $request->user_id)->get();
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $newMap= new Map();
        $newMap->name = $request->name;
        $newMap->description = $request->description;
        $img = $request->file('img');
        $path = $img->storeAs($img->getClientOriginalName());
        $newMap->image = $path;
        $map= $request->file('map');
        $pathMap = $map->storeAs($map->getClientOriginalName());
        $newMap->mapRoute = $pathMap;
        $newMap->difficulty = $request->difficulty;
        $newMap->user_id = $request->user_id;

        $newMap->save();
        return $newMap;
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Map $map)
    {
        $mapToUpdate = Map::find($map->id);
        $mapToUpdate->name = $request->name;
        $mapToUpdate->description = $request->description;
        $mapToUpdate->image = $request->image;
        $mapToUpdate->mapRoute = $request->mapRoute;
        $mapToUpdate->difficulty = $request->difficulty;
        $mapToUpdate->user_id = $request->user_id;
        $mapToUpdate->save();
        return $mapToUpdate;

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Map $map)
    {
        $map->delete();
        return response()->json(
            [
                'message' => 'Map deleted'
            ]
        );
    }
}
