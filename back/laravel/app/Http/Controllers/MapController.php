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
        return response()->json(Map::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function mapsByDifficulty($difficulty)
    {
        return response()->json(Map::where('difficulty', $difficulty)->get(), 200);
    }

    public function getMap($request)
    {
        $map = Map::find($request->id);
        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }
        return $map;
    }

    public function getMapsByUser($request)
    {
        $maps = response()->json(Map::where('user_id', $request->user_id)->get(), 200);
        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found for the user'
            ], 404);
        }
        return $maps;
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
        return response()->json($newMap, 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Map $map)
    {
        $mapToUpdate = Map::find($map)->first();
        if (!$mapToUpdate) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }
        $mapToUpdate->name = $request->name;
        $mapToUpdate->description = $request->description;
        $img = $request->file('img');
        dd($img);
        $path = $img->storeAs('/images',$img->getClientOriginalName());
        $mapToUpdate->image = $path;
        $map= $request->file('map');
        $pathMap = $map->storeAs('/public',$map->getClientOriginalName());
        $mapToUpdate->mapRoute = $pathMap;
        $mapToUpdate->difficulty = $request->difficulty;
        $mapToUpdate->user_id = $request->user_id;
        $mapToUpdate->save();
        return response()->json($mapToUpdate, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Map $map)
    {
        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }
        $map->delete();
        return response()->json([
            'message' => 'Map deleted'
        ]);
    }
}
