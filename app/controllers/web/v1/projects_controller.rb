# frozen_string_literal: true

module Web
  module V1
    class ProjectsController < ApplicationController # rubocop:disable Style/Documentation
      before_action :set_project, only: %i[show debts amount_technical_debt hierarchical_json general_report]

      def index
        @projects = Project.all
      end

      def show; end

      # Lista todos os comentários com dívida

      def debts
        @debts = @project.debts
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      # Retorna todos os comentários de todos os projetos com score
      def scores
        @scores = Project.all_debts_with_score
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      # Retorna a quantidade de dívida por projeto
      def amount_technical_debt
        render json: { amount: @project.amount_tecnical_debt_for_type }, status: :ok
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      # retorna um json hierárquico para criação dos gráficos

      def hierarchical_json
        chart_type = params[:type] || 'scale'
        render json: HierarchicalJsonService.new(@project.id, chart_type: chart_type.to_sym).call.first, status: :ok
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      # cria um relatório csv com os tipos de TD e com os scores dos comentátios

      def general_report
        send_data GeneralReport.new(@project.id).call, filename: "#{@project.name}_#{Time.new.to_i}.csv",
                                                       type: 'application/csv'
      end

      private

      # Define o projeto
      def set_project
        @project = Project.find(params[:id])
      end
    end
  end
end
