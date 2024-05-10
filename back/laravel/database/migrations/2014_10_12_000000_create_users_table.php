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
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('username')->nullable()->default(null);
            $table->binary('image')->nullable()->default(null);
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('admin')->default(false);
            $table->boolean('googleLogin')->default(false);
        });

        DB::table('users')->insert([
            'name'=> 'Ruben',
            'username'=> 'rubenlora',
            'email'=> 'a21rublormar@inspedralbes.cat',
            'password'=> 'ruben',
            'admin'=> true,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
};
