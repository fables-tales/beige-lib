require "bundler"
Bundler.setup

require "jasmine"

load 'jasmine/tasks/jasmine.rake'

task :default => "jasmine:ci"

desc "Build frabjous (including dependencies)"
task :build do
  require "sprockets"
  environment = Sprockets::Environment.new
  environment.append_path 'src'
  environment.append_path 'vendor'
  environment["beige"].write_to("build/beige.js")
end