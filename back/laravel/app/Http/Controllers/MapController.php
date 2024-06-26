<?php

namespace App\Http\Controllers;

use App\Models\Map;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

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
        $maps = response()->json(Map::where('default', 1)->get(), 200);

        // dd($maps);
        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found'
            ], 404);
        }
        return $maps;
    }

    public function getRandomMaps(){
        $maps1 = Map::where('difficulty', 1)->get();
        $maps1= $maps1->random(1);
        $maps2 = Map::where('difficulty', 2)->get();
        $maps2= $maps2->random(1);
        $maps3 = Map::where('difficulty', 3)->get();
        $maps3= $maps3->random(1);
        
        $maps = [$maps1[0], $maps2[0], $maps3[0]];

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
            $newMap->image = '/' . $imgPath;

            $mapPath = $request->file('map')->storeAs('/maps', $request->file('map')->getClientOriginalName());
            $map = $request->file('map');
            $mapName = $map->getClientOriginalName();
            $map->move(public_path('/maps'), $mapName);
            $newMap->mapRoute = '/' . $mapPath;
        } else {
            return response()->json([
                'error' => 'Image or map not found'
            ], 404);
        }

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
    public function update(Request $request)
{
    // Validación inicial de los campos requeridos
    $request->validate([
        'map_id' => 'required'
    ]);

    // Buscar el mapa a actualizar
    $mapToUpdate = Map::find($request->map_id);

    if (!$mapToUpdate) {
        return response()->json([
            'error' => 'Map not found'
        ], 404);
    }

    // Validar y actualizar dificultad
    if ($request->has('difficulty')) {
        if ($request->difficulty < 1 || $request->difficulty > 3) {
            return response()->json([
                'error' => 'Difficulty must be between 1 and 3'
            ], 400);
        } else {
            $mapToUpdate->difficulty = $request->difficulty;
        }
    }

    // Validar y actualizar estado
    if ($request->has('state')) {
        if (!in_array($request->state, ['approved', 'pending', 'reported'])) {
            return response()->json([
                'error' => 'State must be Approved, Pending or Rejected'
            ], 400);
        } else {
            $mapToUpdate->state = $request->state;
        }
    }

    // Actualizar nombre si está presente
    if ($request->has('name')) {
        $mapToUpdate->name = $request->name;
    }

    // Actualizar descripción si está presente
    if ($request->has('description')) {
        $mapToUpdate->description = $request->description;
    }

    // Manejar la carga de la imagen si está presente
    if ($request->hasFile('img')) {
        $imgPath = $request->file('img')->storeAs('/images/maps', $request->file('img')->getClientOriginalName());
        $img = $request->file('img');
        $imgName = $img->getClientOriginalName();
        $img->move(public_path('images/maps'), $imgName);
        $mapToUpdate->image = $imgPath;
    }

    // Manejar la carga del mapa si está presente
    if ($request->hasFile('map')) {
        $mapPath = $request->file('map')->storeAs('/maps', $request->file('map')->getClientOriginalName());
        $map = $request->file('map');
        $mapName = $map->getClientOriginalName();
        $map->move(public_path('maps'), $mapName);
        $mapToUpdate->mapRoute = $mapPath;
    }

    // Guardar los cambios y retornar la respuesta adecuada
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

        $filename = $map->name . '.json';

        $headers = [
            'Content-Disposition' => 'attachment; filename=' . $filename,
        ];

        return response()->download($path, $filename, $headers);
    }

    public function mapsCommunity($difficulty)
    {
        $maps = Map::where('difficulty', $difficulty)->where('state', 'Approved')->get();

        foreach ($maps as $map) {
            if ($map->user_id) {
                $user = User::find($map->user_id);
                $map->user = $user->username;
            } else {
                $map->user = null;
            }
        }

        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found'
            ], 404);
        } else {
            return response()->json($maps, 200);
        }
    }

    public function mapsCommunityAll()
    {
        $maps = Map::where('state', 'Approved')->get();

        foreach ($maps as $map) {
            if ($map->user_id) {
                $user = User::find($map->user_id);
                $map->user = $user->username;
            } else {
                $map->user = null;
            }
        }

        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found'
            ], 404);
        } else {
            return response()->json($maps, 200);
        }
    }

    public function addLike(Request $request)
    {
        $map = Map::find($request->map_id);

        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }

        $map->likes = $map->likes + 1;

        if ($map->save()) {
            return response()->json($map, 200);
        } else {
            return response()->json([
                'error' => 'Error updating the map'
            ], 500);
        }
    }

    public function removeLike(Request $request)
    {
        $map = Map::find($request->map_id);
        
        if (!$map) {
            return response()->json([
                'error' => 'Map not found'
            ], 404);
        }

        $map->likes = $map->likes - 1;

        if ($map->save()) {
            return response()->json($map, 200);
        } else {
            return response()->json([
                'error' => 'Error updating the map'
            ], 500);
        }
    }

    public function searchMaps($sentence)
    {
        $maps = Map::where('name', 'like', '%' . $sentence . '%')
                    ->orWhere('description', 'like', '%' . $sentence . '%')
                    ->get();

        if ($maps->isEmpty()) {
            return response()->json([
                'error' => 'No maps found'
            ], 404);
        } else {
            return response()->json($maps, 200);
        }
    }
}
