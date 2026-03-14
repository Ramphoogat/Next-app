"use client";

import { useState } from 'react';
import { Server, Zap, Search } from 'lucide-react';
import { EmailCategoryButton, EmailTemplateGrid } from './email_templates';
import DataAnalyticsTemplateGrid, { DataAnalyticsCategoryButton } from './data_analytics_templates';
import AiMlTemplateGrid, { AiMlCategoryButton } from './ai_ml_templates';
import AutomotiveTemplateGrid, { AutomotiveCategoryButton } from './automotive_templates';
import CreativeContentTemplateGrid, { CreativeContentCategoryButton } from './creative_content_templates';
import DevopsTemplateGrid, { DevopsCategoryButton } from './devops_templates';
import ECommerceTemplateGrid, { ECommerceCategoryButton } from './e_commerce_templates';
import EducationTemplateGrid, { EducationCategoryButton } from './education_templates';
import EnergyTemplateGrid, { EnergyCategoryButton } from './energy_templates';
import FinanceTemplateGrid, { FinanceCategoryButton } from './finance_templates';
import GamingTemplateGrid, { GamingCategoryButton } from './gaming_templates';
import GovernmentTemplateGrid, { GovernmentCategoryButton } from './government_templates';
import HealthcareTemplateGrid, { HealthcareCategoryButton } from './healthcare_templates';
import HrTemplateGrid, { HrCategoryButton } from './hr_templates';
import IotTemplateGrid, { IotCategoryButton } from './iot_templates';
import LegalTemplateGrid, { LegalCategoryButton } from './legal_templates';
import ManufacturingTemplateGrid, { ManufacturingCategoryButton } from './manufacturing_templates';
import MediaTemplateGrid, { MediaCategoryButton } from './media_templates';
import MiscTemplateGrid, { MiscCategoryButton } from './misc_templates';
import ProductivityTemplateGrid, { ProductivityCategoryButton } from './productivity_templates';
import RealEstateTemplateGrid, { RealEstateCategoryButton } from './real_estate_templates';
import SocialMediaTemplateGrid, { SocialMediaCategoryButton } from './social_media_templates';
import TravelTemplateGrid, { TravelCategoryButton } from './travel_templates';
import AiResearchTemplateGrid, { AiResearchCategoryButton } from './ai_research_templates';
import AirtableTemplateGrid, { AirtableCategoryButton } from './airtable_templates';
import DatabaseTemplateGrid, { DatabaseCategoryButton } from './database_templates';
import DiscordTemplateGrid, { DiscordCategoryButton } from './discord_templates';
import FormsTemplateGrid, { FormsCategoryButton } from './forms_templates';
import GmailTemplateGrid, { GmailCategoryButton } from './gmail_templates';
import GoogleWorkspaceTemplateGrid, { GoogleWorkspaceCategoryButton } from './google_workspace_templates';
import HrRecruitmentTemplateGrid, { HrRecruitmentCategoryButton } from './hr_recruitment_templates';
import SocialTemplateGrid, { SocialCategoryButton } from './social_templates';
import NotionTemplateGrid, { NotionCategoryButton } from './notion_templates';
import OpenaiTemplateGrid, { OpenaiCategoryButton } from './openai_templates';
import OtherTemplateGrid, { OtherCategoryButton } from './other_templates';
import OtherIntegrationsTemplateGrid, { OtherIntegrationsCategoryButton } from './other_integrations_templates';
import PdfTemplateGrid, { PdfCategoryButton } from './pdf_templates';
import SlackTemplateGrid, { SlackCategoryButton } from './slack_templates';
import TelegramTemplateGrid, { TelegramCategoryButton } from './telegram_templates';
import WhatsappTemplateGrid, { WhatsappCategoryButton } from './whatsapp_templates';
import WordpressTemplateGrid, { WordpressCategoryButton } from './wordpress_templates';
import { IN8nTemplate } from './templateUtils';

export default function Templates({ onUseTemplate }: { onUseTemplate?: (template: IN8nTemplate) => void }) {
    const [activeCategory, setActiveCategory] = useState<string | null>('email');

    return (
        <div className="w-full">
            <div className="mb-8 text-center md:text-left flex flex-col items-center md:items-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-sm font-medium mb-4">
                    <Zap className="w-4 h-4" />
                    <span>Boost your productivity</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Workflow Templates
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-2xl text-base">
                    Choose a pre-built template to get started quickly. Hardcoded templates are optimized for performance and instant access.
                </p>
            </div>

            <div className="flex flex-col gap-6">

                {/* Top Categories */}
                <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mr-2 hidden md:block">
                        Categories:
                    </h3>

                    <EmailCategoryButton isActive={activeCategory === 'email'} onClick={() => setActiveCategory(activeCategory === 'email' ? null : 'email')} />
                    <DataAnalyticsCategoryButton isActive={activeCategory === 'data_analytics'} onClick={() => setActiveCategory(activeCategory === 'data_analytics' ? null : 'data_analytics')} />
                    <AiMlCategoryButton isActive={activeCategory === 'ai_ml'} onClick={() => setActiveCategory(activeCategory === 'ai_ml' ? null : 'ai_ml')} />
                    <AutomotiveCategoryButton isActive={activeCategory === 'automotive'} onClick={() => setActiveCategory(activeCategory === 'automotive' ? null : 'automotive')} />
                    <CreativeContentCategoryButton isActive={activeCategory === 'creative_content'} onClick={() => setActiveCategory(activeCategory === 'creative_content' ? null : 'creative_content')} />
                    <DevopsCategoryButton isActive={activeCategory === 'devops'} onClick={() => setActiveCategory(activeCategory === 'devops' ? null : 'devops')} />
                    <ECommerceCategoryButton isActive={activeCategory === 'e_commerce'} onClick={() => setActiveCategory(activeCategory === 'e_commerce' ? null : 'e_commerce')} />
                    <EducationCategoryButton isActive={activeCategory === 'education'} onClick={() => setActiveCategory(activeCategory === 'education' ? null : 'education')} />
                    <EnergyCategoryButton isActive={activeCategory === 'energy'} onClick={() => setActiveCategory(activeCategory === 'energy' ? null : 'energy')} />
                    <FinanceCategoryButton isActive={activeCategory === 'finance'} onClick={() => setActiveCategory(activeCategory === 'finance' ? null : 'finance')} />
                    <GamingCategoryButton isActive={activeCategory === 'gaming'} onClick={() => setActiveCategory(activeCategory === 'gaming' ? null : 'gaming')} />
                    <GovernmentCategoryButton isActive={activeCategory === 'government'} onClick={() => setActiveCategory(activeCategory === 'government' ? null : 'government')} />
                    <HealthcareCategoryButton isActive={activeCategory === 'healthcare'} onClick={() => setActiveCategory(activeCategory === 'healthcare' ? null : 'healthcare')} />
                    <HrCategoryButton isActive={activeCategory === 'hr'} onClick={() => setActiveCategory(activeCategory === 'hr' ? null : 'hr')} />
                    <IotCategoryButton isActive={activeCategory === 'iot'} onClick={() => setActiveCategory(activeCategory === 'iot' ? null : 'iot')} />
                    <LegalCategoryButton isActive={activeCategory === 'legal'} onClick={() => setActiveCategory(activeCategory === 'legal' ? null : 'legal')} />
                    <ManufacturingCategoryButton isActive={activeCategory === 'manufacturing'} onClick={() => setActiveCategory(activeCategory === 'manufacturing' ? null : 'manufacturing')} />
                    <MediaCategoryButton isActive={activeCategory === 'media'} onClick={() => setActiveCategory(activeCategory === 'media' ? null : 'media')} />
                    <MiscCategoryButton isActive={activeCategory === 'misc'} onClick={() => setActiveCategory(activeCategory === 'misc' ? null : 'misc')} />
                    <ProductivityCategoryButton isActive={activeCategory === 'productivity'} onClick={() => setActiveCategory(activeCategory === 'productivity' ? null : 'productivity')} />
                    <RealEstateCategoryButton isActive={activeCategory === 'real_estate'} onClick={() => setActiveCategory(activeCategory === 'real_estate' ? null : 'real_estate')} />
                    <SocialMediaCategoryButton isActive={activeCategory === 'social_media'} onClick={() => setActiveCategory(activeCategory === 'social_media' ? null : 'social_media')} />
                    <TravelCategoryButton isActive={activeCategory === 'travel'} onClick={() => setActiveCategory(activeCategory === 'travel' ? null : 'travel')} />
                    <AiResearchCategoryButton isActive={activeCategory === 'ai_research'} onClick={() => setActiveCategory(activeCategory === 'ai_research' ? null : 'ai_research')} />
                    <AirtableCategoryButton isActive={activeCategory === 'airtable'} onClick={() => setActiveCategory(activeCategory === 'airtable' ? null : 'airtable')} />
                    <DatabaseCategoryButton isActive={activeCategory === 'database'} onClick={() => setActiveCategory(activeCategory === 'database' ? null : 'database')} />
                    <DiscordCategoryButton isActive={activeCategory === 'discord'} onClick={() => setActiveCategory(activeCategory === 'discord' ? null : 'discord')} />
                    <FormsCategoryButton isActive={activeCategory === 'forms'} onClick={() => setActiveCategory(activeCategory === 'forms' ? null : 'forms')} />
                    <GmailCategoryButton isActive={activeCategory === 'gmail'} onClick={() => setActiveCategory(activeCategory === 'gmail' ? null : 'gmail')} />
                    <GoogleWorkspaceCategoryButton isActive={activeCategory === 'google_workspace'} onClick={() => setActiveCategory(activeCategory === 'google_workspace' ? null : 'google_workspace')} />
                    <HrRecruitmentCategoryButton isActive={activeCategory === 'hr_recruitment'} onClick={() => setActiveCategory(activeCategory === 'hr_recruitment' ? null : 'hr_recruitment')} />
                    <SocialCategoryButton isActive={activeCategory === 'social'} onClick={() => setActiveCategory(activeCategory === 'social' ? null : 'social')} />
                    <NotionCategoryButton isActive={activeCategory === 'notion'} onClick={() => setActiveCategory(activeCategory === 'notion' ? null : 'notion')} />
                    <OpenaiCategoryButton isActive={activeCategory === 'openai'} onClick={() => setActiveCategory(activeCategory === 'openai' ? null : 'openai')} />
                    <OtherCategoryButton isActive={activeCategory === 'other'} onClick={() => setActiveCategory(activeCategory === 'other' ? null : 'other')} />
                    <OtherIntegrationsCategoryButton isActive={activeCategory === 'other_integrations'} onClick={() => setActiveCategory(activeCategory === 'other_integrations' ? null : 'other_integrations')} />
                    <PdfCategoryButton isActive={activeCategory === 'pdf'} onClick={() => setActiveCategory(activeCategory === 'pdf' ? null : 'pdf')} />
                    <SlackCategoryButton isActive={activeCategory === 'slack'} onClick={() => setActiveCategory(activeCategory === 'slack' ? null : 'slack')} />
                    <TelegramCategoryButton isActive={activeCategory === 'telegram'} onClick={() => setActiveCategory(activeCategory === 'telegram' ? null : 'telegram')} />
                    <WhatsappCategoryButton isActive={activeCategory === 'whatsapp'} onClick={() => setActiveCategory(activeCategory === 'whatsapp' ? null : 'whatsapp')} />
                    <WordpressCategoryButton isActive={activeCategory === 'wordpress'} onClick={() => setActiveCategory(activeCategory === 'wordpress' ? null : 'wordpress')} />

                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium bg-white dark:bg-gray-800/50 text-gray-400 dark:text-gray-600 border border-gray-100 dark:border-gray-800 cursor-not-allowed"
                    >
                        <Server className="w-4 h-4 opacity-50" />
                        Database Sync
                        <span className="ml-2 text-[10px] uppercase tracking-wider bg-gray-100 dark:bg-gray-700/50 px-1.5 py-0.5 rounded">Soon</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-grow pt-2">
                    {activeCategory === 'email' ? (
                        <EmailTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'data_analytics' ? (
                        <DataAnalyticsTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'ai_ml' ? (
                        <AiMlTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'automotive' ? (
                        <AutomotiveTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'creative_content' ? (
                        <CreativeContentTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'devops' ? (
                        <DevopsTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'e_commerce' ? (
                        <ECommerceTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'education' ? (
                        <EducationTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'energy' ? (
                        <EnergyTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'finance' ? (
                        <FinanceTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'gaming' ? (
                        <GamingTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'government' ? (
                        <GovernmentTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'healthcare' ? (
                        <HealthcareTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'hr' ? (
                        <HrTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'iot' ? (
                        <IotTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'legal' ? (
                        <LegalTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'manufacturing' ? (
                        <ManufacturingTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'media' ? (
                        <MediaTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'misc' ? (
                        <MiscTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'productivity' ? (
                        <ProductivityTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'real_estate' ? (
                        <RealEstateTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'social_media' ? (
                        <SocialMediaTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'travel' ? (
                        <TravelTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'ai_research' ? (
                        <AiResearchTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'airtable' ? (
                        <AirtableTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'database' ? (
                        <DatabaseTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'discord' ? (
                        <DiscordTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'forms' ? (
                        <FormsTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'gmail' ? (
                        <GmailTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'google_workspace' ? (
                        <GoogleWorkspaceTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'hr_recruitment' ? (
                        <HrRecruitmentTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'social' ? (
                        <SocialTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'notion' ? (
                        <NotionTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'openai' ? (
                        <OpenaiTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'other' ? (
                        <OtherTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'other_integrations' ? (
                        <OtherIntegrationsTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'pdf' ? (
                        <PdfTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'slack' ? (
                        <SlackTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'telegram' ? (
                        <TelegramTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'whatsapp' ? (
                        <WhatsappTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : activeCategory === 'wordpress' ? (
                        <WordpressTemplateGrid onUseTemplate={onUseTemplate} />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl bg-white dark:bg-gray-900/50 text-gray-400">
                            <Search className="w-10 h-10 mb-4 text-gray-300 dark:text-gray-600" />
                            <p className="text-base font-medium text-gray-500 dark:text-gray-400">Select a category to view templates</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
