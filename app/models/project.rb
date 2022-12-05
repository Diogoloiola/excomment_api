class Project < ApplicationRecord # rubocop:disable Style/Documentation, Style/FrozenStringLiteralComment
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

  def amount_tecnical_debt_for_type
    result = {}
    debts.each do |debt|
      key = debt['tdtype'].gsub(' ', '_')

      if result[key].nil?
        result[key] = 0
      else
        result[key] += 1
      end
    end
    result
  end

  def comments_with_score # rubocop:disable Metrics/AbcSize
    scores = Project.all_debts_with_score
    result = []
    debts.each do |debt|
      comment = scores.find { |s| s['id'] == debt['idcomment'] }

      paths = comment['path'].gsub('\\', '/').split '/'
      index = paths.index('src') || paths.index('source')

      result << { id_comment: debt['idcomment'], score: comment['scoretotal'],
                  path: paths.slice(index, paths.size).join('/'), td_type: debt['tdtype'] }
    end
    result
  end

  def self.all_debts_with_score # rubocop:disable Metrics/MethodLength
    sql = <<~SQL.squish
       select * from (
         select padroes.id,
          COALESCE(total, 0) as totalPadroes,
          COALESCE(totalh, 0) as totalHeuristicas,
          COALESCE(total, 0) + COALESCE(totalh, 0) as scoreTotal,
          padroes.comment,
          padroes.path,
          padroes.classe,
          padroes.method
         from
          (select sum(score) as total,
                  c.id as id,
                  c.comment as comment,
                  c.path as path,
                  cl.name as Classe,
                  m.name as method
           from comments c
           left join pattern_comment pc ON pc.idComment=c.id
           left join pattern p ON p.id = pc.idPattern
           left join classes cl ON cl.id = c.idclass
           left join methods m ON m.id = c.idmethod
           group by c.id, cl.id, m.id
           order by total) as padroes
      right join
          (select c.id as id,
                  sum(score) as totalh,
                  c.path as path
           from comments c
           left join comment_heuristicas ch ON ch.idcomment = c.id
           left join heuristicas h ON ch.idheuristica = h.id
           group by c.id) as heuristicas
      ON padroes.id = heuristicas.id
      order by scoreTotal desc, total desc, totalh desc) total
      where scoreTotal > 0
    SQL
    stmt = ApplicationRecord.sanitize_sql([sql])
    ActiveRecord::Base.connection.exec_query(stmt).to_a
  end
end
