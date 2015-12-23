---
layout: post
category: development
---

<a name="top"></a>
### Setting Up A New Rails App

##### **Table of Contents**
* [Creating the Application](#creating-the-application)
* [RSpec](#rspec)
* [Shoulda Matchers](#shoulda-matchers)
* [Active Record Helper](#active-record-helper)
* [Database Cleaner](#active-record-helper)
* [HAML](#haml)
* [Rubocop](#rubocop)
* [Devise](#devise)
* [Twitter Bootstrap](#twitter-bootstrap)
* [Making Changes to application.rb](#application.rb)
* [Making Changes to rails_helper.rb](#rails_helper.rb)
* [References](#references)

I've developed a couple apps with Rails but every time I look to start one
there are always so many resources that go over the steps to start a rails app.
Here, I'm hoping to compile all of these resources and add some of my own
necessary configurations I make to my rails applications I've picked up through
my internship experience.

<a name="creating-the-application"></a>
##### **Creating the Application**

I generally use postgres as my database of choice. The "-T" tag removes the
test directory which is unnecessary since we will be installing rspec later.

`rails new [app name] -T —database=postgresql`

Now create the database.

`rake db:create`

[Back to top](#top)

<a name="rspec"></a>
##### **RSpec**

Add rspec-rails to your gemfile and bundle. Running the following command
sets up the /spec directory.

`rails generate rspec:install`

[Back to top](#top)

<a name="shoulda-matchers"></a>
##### **Shoulda Matchers**

Shoulda Matchers is an essential gem for testing. Add it and bundle. I had issues
with my setup when I didn't add the following lines to my active_record_helper
(which I will cover next) so do add the following lines.

```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```
[Back to top](#top)

<a name="active-record-helper"></a>
##### **Active Record Helper**

Active record helper is an alternative to rails_helper for testing which
is important because it keeps the testing suite fast by only loading the
necessary files to run the given test.

```ruby
ENV['RAILS_ENV'] ||= 'test'
require 'active_record'
require 'shoulda/matchers'
require 'factory_girl'
require 'byebug'
require './spec/support/database_cleaner'

unless defined?(Rails)
  database_yml = File.read('config/database.yml')
  database_yml_erb_parsed = ERB.new(database_yml).result
  connection_info = YAML.load(database_yml_erb_parsed).fetch('test')
  ActiveRecord::Base.establish_connection(connection_info)
  if ActiveRecord::Migrator.needs_migration?
    require_relative '../config/application'
    ActiveRecord::Base.maintain_test_schema = true
  end
end

ActiveRecord::Migration.maintain_test_schema!

FactoryGirl.find_definitions

RSpec.configure do |config|
  config.include(FactoryGirl::Syntax::Methods)
end
```
[Back to top](#top)

<a name="database-cleaner"></a>
##### **Database Cleaner**

Database cleaner is an important package because it makes sure your
testing directory is clean on every run. Add the gem database_cleaner and bundle.
Create database_cleaner.rb in the /spec/support directory and add the below code.

```ruby
require 'database_cleaner'
RSpec.configure do |config|
  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, type: :feature) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end
```
[Back to top](#top)

<a name="haml"></a>
##### **HAML**
HAML is pretty optional but a nice alternative to erb with the same functionality
that allows you to write views in HAML. HAML syntax is indentation delimitted so
you don't have to worry about closing tags. Add haml-rails and bundle. Then run the
following code.

`rails generate haml:application_layout convert`
[Back to top](#top)

<a name="rubocop"></a>
##### **Rubocop**
Rubocop is a pretty important to add to any Rails app since it does code style
checking automatically and enforces a lot of good practices. Good style is
important for long term maintenance so setting up Rubocop is definitely wortwhile.
Install the gem, bundle, and add the following code to .rubocop.yml in your
app's main directory.

```
AllCops:
  Include:
    - '**/Rakefile'
    - '**/config.ru'
    - 'lib/tasks/**/*'
  Exclude:
    - Gemfile*
    - 'db/**/*'
    - 'config/**/*'
    - 'bin/**/*'
    - 'vendor/bundle/**/*'
  RunRailsCops: true

# We don't care about length per se, since we check cyclomatic complexity.
Metrics/ModuleLength:
  Enabled: false
Metrics/ClassLength:
  Enabled: false
Metrics/MethodLength:
  Enabled: false

# Trailing commas make for clearer diffs because the last line won't appear
# to have been changed, as it would if it lacked a comma and had one added.
Style/TrailingComma:
  EnforcedStyleForMultiline: comma

# Cop supports --auto-correct.
# Configuration parameters: PreferredDelimiters.
Style/PercentLiteralDelimiters:
  PreferredDelimiters:
    # Using `[]` for string arrays instead of `()`, since normal arrays are
    # indicated with `[]` not `()`.
    '%w': '[]'
    '%W': '[]'

Style/AndOr:
  # Whether `and` and `or` are banned only in conditionals (conditionals)
  # or completely (always).
  # They read better, more like normal English.
  Enabled: false

Style/Documentation:
  Exclude:
    - 'app/policies/**/*'
```
[Back to top](#top)

<a name="devise"></a>
##### **Devise**
Since most apps require some sort of user authentication and security, devise
is a good place to go for that. It does a lot of the boilerplate stuff for you
like setting up routes for login/signup and gives you a lot of elements for
customizing email, password, and authentication settings. Add the gem, bundle,
and run the following lines.

```
rails generate devise:install
rails generate devise MODEL
```

Another good thing to set up for devise is Devise Macros. Add the following code
to your /spec/support directory in a devise.rb file. This allows you to stub
logins in specs.

```ruby
# Macros for testing devise authentication in controllers
module DeviseMacros
  def self.extended(base)
    base.include(Devise::TestHelpers)
  end

  # An includable module that provides a method to login a specified user
  module LoginUser
    def login_user(user)
      @request.env['devise.mapping'] = Devise.mappings.fetch(:user)
      sign_in(user)
    end
  end
end

RSpec.configure do |config|
  config.extend(DeviseMacros, type: :controller)
  config.include(DeviseMacros::LoginUser, type: :controller)
end
```
[Back to top](#top)

<a name="twitter-bootstrap"></a>
##### **Twitter Bootstrap**
Twitter Bootstrap is a great way to quickly get an app off the grab and make the
frontend look presentable. A lot of cool CSS and Javascript components come straight out
of the box. Add bootstrap-sass to your gemfile and bundle.

This `mv app/assets/stylesheets/application.css app/assets/stylesheets/application.scss`
creates a sass file for your styling. Inside this file, add the following lines.
```
@import "bootstrap-sprockets";
@import "bootstrap";
```
This adds bootstrap css. If you have any other imported files, make sure you change
all `*=` to `@import` since that is correct sass syntax.
[Back to top](#top)

<a name="application.rb"></a>
##### **Making Changes to application.rb**
```ruby
config.app_generators.scaffold_controller :responders_controller

config.generators do |g|
  g.assets false # Don't generate JS and CSS
  g.helper false # Presenters are preferable to helpers.

  require 'haml-rails'
  g.template_engine :haml

  g.test_framework :rspec, view_specs: false
  g.fixture_replacement :factory_girl, dir: 'spec/factories'
end
```

Also, it is important to autoload lib files.

```ruby
config.autoload_paths << Rails.root.join('lib')
```
[Back to top](#top)

<a name="rails_helper.rb"></a>
##### **Making Changes to rails_helper.rb**
Several changes need to be made to rails_helper.rb to
set up our testing environment.

Comment out the following line since we're using database cleaner.

```ruby
config.use_transactional_fixtures = true
```

Also, require all the support files so we do not have to explicitly require them.

```ruby
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
```
[Back to top](#top)

<a name="references"></a>
##### **References**

The majority of these ideas were inspired by former coworker Clay Shentrup,
now the VP of Engineering at Able Health.

Below are two articles that explain the avoidance of bundler require and why
the use of an active record helper is recommended.

[Avoiding bundler require](http://myronmars.to/n/dev-blog/2012/12/5-reasons-to-avoid-bundler-require)
[Why I use active_record_helper](http://articles.coreyhaines.com/posts/active-record-spec-helper/)



[Back to top](#top)












