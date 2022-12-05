# frozen_string_literal: true

class HierarchicalJsonService # rubocop:disable Style/Documentation
  def initialize(project_id, chart_type: :scale)
    @comments = fetch_comments(project_id)
    @chart_type = chart_type
    @tree = []
  end

  def call
    create_tree
  end

  private

  # Adapted from  : https://gist.github.com/stephanbogner/4b590f992ead470658a5ebf09167b03d

  def create_tree # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    (0..@comments.size - 1).each do |i|
      path = @comments[i]
      current_level = @tree

      (0..path.size - 3).each do |j|
        part = path[j]

        existing_path = find_where(current_level, 'name', part)
        if existing_path
          current_level = existing_path[:children]
        else
          new_object = create_object(part, path.last, path[path.size - 2])
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

  def create_object(part, score, color) # rubocop:disable PerceivedComplexity, CyclomaticComplexity, MethodLength, AbcSize, DepartmentName
    new_object = { name: part }

    case @chart_type
    when :scale
      if part.include?('.java')
        new_object[:value] = score
      else
        new_object[:children] = []
      end
    when :tree_map_with_debt
      if part.include?('.java')
        new_object[:value] = score
        new_object[:fill] = fetch_color(color.to_sym)
      else
        new_object[:children] = []
      end
    when :sunburst_with_debt
      if part.include?('.java')
        new_object[:value] = score
        new_object[:fill] = fetch_color(color.to_sym)
      else
        new_object[:children] = []
        new_object[:fill] = '#D2B48C'
      end
    when :sunburst_with_scale
      if part.include?('.java')
        new_object[:size] = score
        new_object[:fill] = fetch_color(color.to_sym)
      else
        new_object[:children] = []
        new_object[:fill] = '#D2B48C'
      end
    end

    new_object
  end

  def fetch_comments(project_id)
    Project.find(project_id).comments_with_score.map do |c|
      paths = c[:path].split('/')
      paths << c[:td_type]
      paths << c[:score]
      paths
    end
  end

  def fetch_color(tdtype) # rubocop:disable Metrics/MethodLength
    {
      "architecture debt": '#332288',
      "build debt": '#117733',
      "code debt": '#44AA99',
      "defect debt": '#88CCEE',
      "design debt": '#DDCC77',
      "documentation debt": '#CC6677',
      "people debt": '#AA4499',
      "requirement debt": '#882255',
      "test debt": '#DFFF00'
    }[tdtype]
  end
end
