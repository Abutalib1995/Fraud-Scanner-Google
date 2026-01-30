
import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NewReportData, Report, SearchCategory } from '../types';
import { useScamGuardApi } from '../hooks/useScamGuardApi';
import { analyzeScamDescription } from '../services/geminiService';
import { CheckCircleIcon, InformationCircleIcon, LightBulbIcon, XMarkIcon } from '@heroicons/react/24/solid';

type Inputs = NewReportData;

const categoryOptions = Object.values(SearchCategory);

const ReportPage: React.FC = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>({
      defaultValues: { categories: [], identifiers: {}, scammerInfo: {}, description: '', incidentDate: '' }
  });
  const { loading, submitReport } = useScamGuardApi();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [safetyTips, setSafetyTips] = useState<{ tips: string[]; summary: string } | null>(null);
  const [tipsLoading, setTipsLoading] = useState(false);
  
  const watchedCategories = watch('categories');

  const handleReportAnalysis = useCallback(async (description: string) => {
    setTipsLoading(true);
    const analysis = await analyzeScamDescription(description);
    setSafetyTips(analysis);
    setTipsLoading(false);
  }, []);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { success, newReport } = await submitReport(data);
    if (success && newReport) {
      setShowSuccessModal(true);
      handleReportAnalysis(newReport.description);
      reset();
    } else {
      // In a real app, you would show an error toast/notification here
      alert('There was an error submitting your report. Please try again.');
    }
  };

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 relative animate-fade-in">
        <button onClick={() => setShowSuccessModal(false)} className="absolute top-3 right-3 text-neutral-400 hover:text-neutral-600">
            <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="text-center">
            <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500"/>
            <h2 className="text-2xl font-bold mt-4 text-neutral-800">Report Submitted Successfully!</h2>
            <p className="text-neutral-600 mt-2">Thank you for helping keep the community safe. Your report has been approved and is now searchable.</p>
        </div>
        <div className="mt-6 pt-4 border-t">
            <h3 className="text-lg font-semibold text-primary-dark flex items-center justify-center"><LightBulbIcon className="h-6 w-6 mr-2 text-accent"/> Gemini Safety Analysis</h3>
            {tipsLoading ? (
                <p className="text-center p-4">Analyzing report...</p>
            ) : safetyTips ? (
                <div className="mt-2 space-y-3 text-left">
                    <p className="text-sm italic text-neutral-700 bg-neutral-100 p-3 rounded-md">{safetyTips.summary}</p>
                    <ul className="list-disc list-inside space-y-2 text-neutral-700">
                       {safetyTips.tips.map((tip, index) => <li key={index}>{tip}</li>)}
                    </ul>
                </div>
            ) : (
                <p className="text-sm text-center text-danger p-2">Could not generate safety tips.</p>
            )}
        </div>
      </div>
    </div>
  );

  const inputClassName = "mt-1 block w-full rounded-lg border-neutral-300 bg-white px-4 py-3 text-base text-neutral-900 placeholder:text-neutral-400 shadow-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50";
  const labelClassName = "block text-sm font-medium text-neutral-700";

  return (
    <>
    {showSuccessModal && <SuccessModal />}
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-neutral-200/80 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">Report a Scammer</h1>
        <p className="text-neutral-600 mt-2">Your detailed report helps us verify and warn others.</p>
      </div>
      
      <div className="bg-primary/10 border-l-4 border-primary text-primary-dark p-4 rounded-r-lg mb-8 flex items-start">
          <InformationCircleIcon className="h-6 w-6 mr-3 flex-shrink-0 mt-0.5" />
          <div>
              <h4 className="font-bold">Privacy Note</h4>
              <p className="text-sm">Please do not include your own personal information. Stick to the facts about the scammer.</p>
          </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="border border-neutral-200 rounded-lg p-6 relative">
            <h2 className="absolute -top-3.5 left-4 bg-white px-2 text-lg font-semibold text-neutral-700">Scammer Information</h2>
            <div className="space-y-6 pt-4">
                <div>
                  <label className={`${labelClassName} mb-2`}>What kind of information do you have? (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categoryOptions.map((cat) => (
                    <div key={cat}>
                      <input
                        type="checkbox"
                        id={cat}
                        value={cat}
                        {...register('categories', { required: 'Please select at least one category.' })}
                        className="hidden peer"
                      />
                      <label htmlFor={cat} className="block text-center border-2 border-neutral-200 rounded-lg p-3 cursor-pointer transition duration-200 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary hover:border-primary-light">
                        {cat}
                      </label>
                    </div>
                  ))}
                  </div>
                  {errors.categories && <p className="text-danger text-xs mt-2">{errors.categories.message}</p>}
                </div>

                {watchedCategories?.length > 0 && <div className="space-y-4 pt-4 animate-fade-in">
                  {watchedCategories?.map((cat) => (
                    <div key={cat}>
                        <label htmlFor={`identifier-${cat}`} className={labelClassName}>{cat}</label>
                        <input
                            id={`identifier-${cat}`}
                            type="text"
                            {...register(`identifiers.${cat}`, { required: `${cat} is required.` })}
                            className={inputClassName}
                        />
                        {errors.identifiers?.[cat] && <p className="text-danger text-xs mt-1">{errors.identifiers[cat]?.message}</p>}
                    </div>
                  ))}
                </div>}
            </div>
        </div>

        <div className="border border-neutral-200 rounded-lg p-6 relative">
            <h2 className="absolute -top-3.5 left-4 bg-white px-2 text-lg font-semibold text-neutral-700">Incident Details</h2>
            <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="scammerName" className={labelClassName}>Scammer Name / Alias (if known)</label>
                        <input id="scammerName" type="text" {...register('scammerInfo.name')} className={inputClassName} />
                    </div>
                    <div>
                        <label htmlFor="scammerCompany" className={labelClassName}>Scammer Company (if applicable)</label>
                        <input id="scammerCompany" type="text" {...register('scammerInfo.company')} className={inputClassName} />
                    </div>
                </div>
                
                <div>
                  <label htmlFor="incidentDate" className={labelClassName}>Date of Incident</label>
                  <input id="incidentDate" type="date" {...register('incidentDate', { required: 'Incident date is required.' })} className={inputClassName}/>
                  {errors.incidentDate && <p className="text-danger text-xs mt-1">{errors.incidentDate.message}</p>}
                </div>

                <div>
                  <label htmlFor="description" className={labelClassName}>Description of Scam</label>
                  <textarea
                    id="description"
                    rows={6}
                    {...register('description', { required: 'A detailed description is required.', minLength: { value: 50, message: 'Please provide at least 50 characters.' } })}
                    className={inputClassName}
                    placeholder="Describe what happened in detail. How were you contacted? What did they ask for? How did you realize it was a scam?"
                  ></textarea>
                  {errors.description && <p className="text-danger text-xs mt-1">{errors.description.message}</p>}
                </div>
            </div>
        </div>
        
        <div className="text-right pt-4 border-t border-neutral-200">
          <button type="submit" disabled={loading} className="inline-flex justify-center py-3 px-8 border border-transparent shadow-lg text-sm font-medium rounded-lg text-white bg-gradient-to-r from-primary to-primary-dark transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-neutral-400 disabled:shadow-none disabled:transform-none">
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ReportPage;