# frozen_string_literal: true

module Web
  module V1
    class ProjectsController < ApplicationController # rubocop:disable Style/Documentation
      before_action :set_project, only: %i[show debts amount_technical_debt hierarchical_json]

      def index
        @projects = Project.all
      end

      def show; end

      def debts
        @debts = @project.debts
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      def scores
        @scores = Project.all_debts_with_score
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      def amount_technical_debt
        render json: { amount: @project.amount_tecnical_debt_for_type }, status: :ok
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      def hierarchical_json
        chart_type = params[:type] || 'scale'
        render json: HierarchicalJsonService.new(@project.id, chart_type: chart_type.to_sym).call.first, status: :ok
      rescue StandardError => e
        render json: e.message, status: :unprocessable_entity
      end

      private

      def set_project
        @project = Project.find(params[:id])
      end
    end
  end
end
