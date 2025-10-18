import React from 'react';
import Icon from '../../../components/Appicon';

const ProgressIndicator = ({ currentStep, steps }) => {
  return (
    <div className="w-full bg-background py-6 border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {steps?.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isLast = index === steps?.length - 1;

            return (
              <React.Fragment key={step?.id}>
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-brand ${
                      isCompleted
                        ? 'bg-primary border-primary text-primary-foreground'
                        : isActive
                        ? 'bg-primary border-primary text-primary-foreground'
                        : 'bg-background border-border text-muted-foreground'
                    }`}
                  >
                    {isCompleted ? (
                      <Icon name="Check" size={20} />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step?.title}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step?.description}</p>
                  </div>
                </div>
                {!isLast && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-brand ${
                      isCompleted ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;