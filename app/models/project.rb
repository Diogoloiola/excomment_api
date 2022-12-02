class Project < ApplicationRecord
  self.primary_key = 'id'
  self.table_name = 'projects'

  def debts # rubocop:disable Metrics/MethodLength
    sql = <<~SQL.squish
      select distinct pc.idComment,tp.tdtype, c.comment, c.path, cl.name, m.name
      from
          pattern_comment pc, tdType tp, theme t, theme_tdtype tt, pattern_theme pt, pattern p, comments c
          left join classes cl ON cl.id = c.idclass
          left join methods m ON m.id = c.idMethod
      where
          pc.idPattern = p.id and
          pc.idPattern = pt.idPattern and
          t.id = pt.idTheme and
          t.id = tt.idTheme and
          tt.idTdType = tp.id and
          c.id = pc.idcomment and c.idProject = :id
      order by pc.idComment
    SQL
    stmt = ApplicationRecord.sanitize_sql([sql, { id: }])
    ActiveRecord::Base.connection.exec_query(stmt).to_a
  end
end
