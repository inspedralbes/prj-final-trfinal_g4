# Documentació del Projecte per a entendre Phaser

Aquesta documentació proporciona una visió general de com funciona tota la API construïda a laravel i que fa cada ruta

## Continguts
- [Rutes de mapes](#rutes-mapes)
- [Rutes d'usuari](#rutes-usuari)
- [Rutes de report](#rutes-report)

  



## Rutes-mapes
Hi han les següents rutes per als mapes:

*Publiques*
- Route::get('/maps', [MapController::class, 'index']); Aquesta ruta et mostra totes les dades sobre tots els mapes.
- Route::get('/maps/{map}', [MapController::class, 'getMap']); Aquesta ruta et mostra informació sobre un mapa.
- Route::post('/maps', [MapController::class, 'store']);  Aquesta ruta et permet crear un mapa
- Route::put('/maps/{map}', [MapController::class, 'update']); Aquesta ruta et permet modificar un mapa
- Route::get('/mapsByDifficulty/{difficulty}', [MapController::class, 'mapsByDifficulty']); Aquesta ruta et retorna els mapes de la dificultat que es demani
- Route::get('/defaultMaps', [MapController::class, 'getDefaultMaps']); Aquesta ruta et retorna els mapes que están marcats com a mapes per defecte
- Route::get('/randomMaps', [MapController::class, 'getRandomMaps']); Aquesta ruta et retorna un mapa de cada dificultat aleatoriament de la base de dades.
- Route::get('/mapsCommunity/{difficulty}', [MapController::class, 'mapsCommunity']); Aquesta ruta et retorna tots els mapes de la comunitat de la dificultat dessitjada.
- Route::get('/mapsCommunity', [MapController::class, 'mapsCommunityAll']); Aquesta ruta et retorna tots els maps de la comunitat.
- Route::get('/searchMapsCommunity/{sentence}', [MapController::class, 'searchMaps']); Aquesta ruta et retorna els maps de la comunitat que contenguin el text demanat a la ruta
- Route::post('/mapsCommunity/like', [MapController::class, 'addLike']); Aquesta ruta afegeix un like al mapa dessitjat.
- Route::post('/mapsCommunity/dislike', [MapController::class, 'removeLike']); Aquesta ruta resta un like al mapa dessitjat.
- Route::post('/reportedMaps', [ReportedMapsController::class, 'store']);
*Protegides*
- Route::delete('/maps/{map}', [MapController::class, 'destroy']); Aquesta ruta elimina un mapa, una acció que només pot realitzar un admin
- Route::get('download/{id}', [MapController::class, 'download']); Aquesta ruta descarrega el json d'un mapa
### Rutes d'usuari 
*Publiques*
- Route::get('/users/{user}', [UserController::class, 'show']); Aquesta ruta et retorna la informació d'un usuari
- Route::post('/users', [UserController::class, 'store']); Aquesta ruta crea un usuari
- Route::post('/login', [UserController::class, 'login']); Aquesta ruta et logeja
- Route::post('/register', [UserController::class, 'store']); Aquesta ruta et permet crear un usuari
*Requereixen estar logejat*
- Route::post('/users', [UserController::class, 'update']); Aquesta ruta et permet modificar el teu usuari
- Route::post('/logout', [UserController::class, 'logout']);  Aquesta ruta et permet tancar la teva sessió eliminant el token
*Protegides*
- Route::get('/users', [UserController::class, 'index']); Aquesta ruta et mostra tots el usuaris
- Route::delete('/users/{user}', [UserController::class, 'destroy']); Aquesta ruta elimina un usuari
### Rutes de reports 
*Publiques*
- Route::post('/reportedMaps', [ReportedMapsController::class, 'store']) Aquesta ruta et permet reportar un mapa
*Protegides*

- Route::get('/reportedMaps', [ReportedMapsController::class, 'index']); Aquesta ruta et mostra tots els mapes reportats
- Route::get('/reportedMaps/{reportedMap} ', [ReportedMapsController::class, 'show']); Aquesta ruta et mostra informació d'un mapa reportat
- Route::delete('/reportedMaps/{reportedMap}', [ReportedMapsController::class, 'destroyReport']); Aquesta ruta elimina un report de mapa
- Route::get('/reportedMapsByUser/{user}', [ReportedMapsController::class, 'getReportedMapsByUser']); Aquesta ruta et mostra els mpaes creats per un usuari
- Route::get('/reportedReasons', [ReportedMapsController::class, 'getReportedReason']); Aqueste ruta et mostra les raons de un repot

---
