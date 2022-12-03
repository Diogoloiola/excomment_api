class HierarchicalJsonService # rubocop:disable Style/Documentation
  def initialize(project_id, object_type: :normal)
    @comments = Project.find(project_id).comments_with_score.map { |c| c[:path].split('/') }
    @object_type = object_type
    @tree = []
  end

  def call
    create_tree
  end

  private

  # Adapted from  : https://gist.github.com/stephanbogner/4b590f992ead470658a5ebf09167b03d

  def create_tree # rubocop:disable Metrics/MethodLength
    (0..@comments.size - 1).each do |i|
      path = @comments[i]
      current_level = @tree

      (0..path.size - 1).each do |j|
        part = path[j]

        existing_path = find_where(current_level, 'name', part)
        if existing_path
          current_level = existing_path[:children]
        else
          new_object = create_object(part)
          current_level << new_object

          current_level = new_object[:children]
        end
      end
    end
    @tree
  end

  def find_where(array, key, value)
    t = 0
    t += 1 while t < array.size && array[t][key.to_sym] != value

    t < array.length ? array[t] : false
  end

  def create_object(part)
    new_object = { name: part }

    if @object_type == :normal
      new_object[:children] = [] unless part.include?('.java')
    end

    new_object
  end
end