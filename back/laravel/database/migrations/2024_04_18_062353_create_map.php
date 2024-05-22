<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('maps', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description')->nullable();
            $table->binary('image');
            $table->binary('mapRoute');
            $table->enum('difficulty', array(1, 2, 3));
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('state')->default('pending');
            $table->boolean('default')->default(0);
            $table->timestamps();
        });

        DB::table('maps')->insert([
            'name' => 'Mapa 1',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/mapa1.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 1,
            'default' => true,
            'user_id' => 1,
            'state' => 'approved'
        ]);

        DB::table('maps')->insert([
            'name' => 'Mapa 2',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/mapa2.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 2,
            'default' => true,
            'user_id' => 1,
            'state' => 'approved'
        ]);

        DB::table('maps')->insert([
            'name' => 'Mapa 3',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/mapa3.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 3,
            'default' => true,
            'user_id' => 1,
            'state' => 'approved'
        ]);

        DB::table('maps')->insert([
            'name' => 'Mapa 4',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/Captura.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 1,
            'user_id' => 1,
            'state' => 'approved'
        ]);

        DB::table('maps')->insert([
            'name' => 'Mapa 5',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/Logo.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 2,
            'user_id' => 1,
            'state' => 'approved'
        ]);

        DB::table('maps')->insert([
            'name' => 'Mapa 6',
            'description' => 'Mapa original do jogo',
            'image' => '/images/maps/messieur.png',
            'mapRoute' => '/maps/mapatuto.json',
            'difficulty' => 3,
            'user_id' => 1,
            'state' => 'approved'
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maps');
    }
};
