<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakecommandRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate a new Repository';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $name = $this->argument('name');
        $repoPath = app_path("Repositories/{$name}.php");

        if(file_exists($repoPath)){
            $this->error("Repository $name already Exist");
        }

        if(!is_dir(app_path('Repositories'))){
            mkdir(app_path('Repositories'),0755, true);
        }

        $stub = $this->getStub();
        $stub = str_replace('{{ class }}',$name, $stub);
        $stub = str_replace('{{ namespace }}', 'App\Repositories', $stub);
        
        file_put_contents($repoPath, $stub);
        $this->info("Repositories {$name} Created Successfully");
        return Command::SUCCESS;
    }

    protected function getStub()
    {
        return file_get_contents(base_path('stubs/repository.stub'));
    }
}