<?php

namespace App\Http\Controllers;

use App\Models\Map;
use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;
use SebastianBergmann\Diff\Diff;

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
    public function mapsByDifficulty($difficulty)
    {
        return Map::where('difficulty', $difficulty)->get();
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
        $path = $img->storeAs('/images',$img->getClientOriginalName());
        $newMap->image = $path;
        $map= $request->file('map');
        $pathMap = $map->storeAs('/public',$map->getClientOriginalName());
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
        
        $mapToUpdate = Map::find($map)->first();
        $mapToUpdate->name = $request->name;
        $mapToUpdate->description = $request->description;
        $img = $request->file('img');
        $path = $img->storeAs('/images',$img->getClientOriginalName());
        $mapToUpdate->image = $path;
        $map= $request->file('map');
        $pathMap = $map->storeAs('/public',$map->getClientOriginalName());
        $mapToUpdate->mapRoute = $pathMap;
        $mapToUpdate->difficulty = $request->difficulty;
        $mapToUpdate->user_id = $request->user_id;
        $mapToUpdate->save();
        // dd($mapToUpdate);
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
