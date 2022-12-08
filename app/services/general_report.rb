class GeneralReport # rubocop:disable Style/Documentation
  def initialize(project_id)
    @project = Project.find(project_id)
    @debts = @project.debts
    @scores = Project.all_debts_with_score
  end

  def call
    create_report
  end

  private

  def create_report
    CSV.generate do |csv|
      headers = %w[idcomment tdtype comment name score]
      csv << headers
      @debts.each do |debt|
        comment = @scores.find { |s| s['id'] == debt['idcomment'] }

        csv << [debt['idcomment'], debt['tdtype'], debt['comment'], debt['name'], comment['scoretotal']]
      end
    end
  end
end
