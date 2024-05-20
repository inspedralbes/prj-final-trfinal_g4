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
        return response()->json(Map::all(), 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function mapsByDifficulty($difficulty)
    {
        return response()->json(Map::where('difficulty', $difficulty)->get(), 200);
    }

    public function getMap(int $map)
    {
        $map = Map::find($map);
        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }
        return $map;
    }

    public function getDefaultMaps(){
        $maps = response()->json(Map::where('isOriginal', 1)->get(), 200);
        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found'
            ], 404);
        }
        return $maps;
    }

    public function getRandomMaps(){
        $maps1 = response()->json(Map::where('difficulty', 1)->get(), 200);
        $maps1 = $maps1->random($maps1->count());
        $maps2 = response()->json(Map::where('difficulty', 2)->get(), 200);
        $maps2 = $maps2->random($maps2->count());
        $maps3 = response()->json(Map::where('difficulty', 3)->get(), 200);
        $maps3 = $maps3->random($maps3->count());
        $maps = [$maps1, $maps2, $maps3];

        return $maps;
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
        $request->validate([
            'name' => 'required',
            'img' => 'required',
            'map' => 'required',
            'difficulty' => 'required',
            'user_id' => 'required'
        ]);

        if ($request->difficulty < 1 || $request->difficulty > 3) {
            return response()->json([
                'error' => 'Difficulty must be between 1 and 3'
            ], 400);
        } 

        $newMap = new Map();
        $newMap->name = $request->name;
        $newMap->description = $request->description;

        if (request()->hasFile('img') && request()->hasFile('map')) {
            $imgPath = $request->file('img')->storeAs('/images/maps', $request->file('img')->getClientOriginalName());
            $img = $request->file('img');
            $imgName = $img->getClientOriginalName();
            $img->move(public_path('/images/maps'), $imgName);
            $newMap->image = $imgPath;

            $mapPath = $request->file('map')->storeAs('/maps', $request->file('map')->getClientOriginalName());
            $map = $request->file('map');
            $mapName = $map->getClientOriginalName();
            $map->move(public_path('/maps'), $mapName);
        } else {
            return response()->json([
                'error' => 'Image or map not found'
            ], 404);
        }

        $newMap->mapRoute = $mapPath;
        $newMap->difficulty = $request->difficulty;

        $newMap->user_id = $request->user_id;

        if ($newMap->save()) {
            return response()->json($newMap, 200);
        } else {
            return response()->json([
                'error' => 'Error saving the map'
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Map $map)
    {
        if ($request->difficulty < 1 || $request->difficulty > 3) {
            return response()->json([
                'error' => 'Difficulty must be between 1 and 3'
            ], 400);
        }

        $mapToUpdate = Map::find($map)->first();
        if (!$mapToUpdate) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }

        $mapToUpdate->name = $request->name;
        $mapToUpdate->description = $request->description;

        if (request()->hasFile('img')) {
            $imgPath = $request->file('img')->storeAs('/images/maps', $request->file('img')->getClientOriginalName());
            $img = $request->file('img');
            $imgName = $img->getClientOriginalName();
            $img->move(public_path('images/maps'), $imgName);
            $mapToUpdate->image = $imgPath;
        }

        if (request()->hasFile('map')) {
            $mapPath = $request->file('map')->storeAs('/maps', $request->file('map')->getClientOriginalName());
            $map = $request->file('map');
            $mapName = $map->getClientOriginalName();
            $map->move(public_path('maps'), $mapName);
            $mapToUpdate->mapRoute = $mapPath;
        } else {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }

        $mapToUpdate->difficulty = $request->difficulty;
        $mapToUpdate->state = $request->state;

        if ($mapToUpdate->save()) {
            return response()->json($mapToUpdate, 200);
        } else {
            return response()->json([
                'error' => 'Error updating the map'
            ], 500);
        }
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

    public function download($id)
    {
        $map = Map::find($id);
        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }

        $path = public_path($map->mapRoute);

        if (!file_exists($path)) {
            return response()->json([
                'error' => 'File not found'
            ], 404);
        }

        return response()->download($path);
    }
}
