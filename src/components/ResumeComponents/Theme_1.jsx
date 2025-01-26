import React from "react";

function Theme_1() {
  return (
    <div>
      {/* <body className="text-gray-700 font-sans"> */}
      <div className="max-w-4xl mx-auto p-8 text-gray-700 font-sans">
        <div className="flex justify-between items-end border-b-4 border-gray-300 pb-2">
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-gray-600 uppercase">
              Liane
            </h1>
            <h2 className="text-2xl font-bold tracking-wide text-black uppercase">
              Cormier
            </h2>
          </div>
          <div className="text-right">
            <p className="text-xs">Detroit, MI | www.greatsiteaddress.com</p>
            <p className="text-xs">313.555.0100 | liane@example.com</p>
          </div>
        </div>

        <div className="mt-2 border-b-4 border-gray-300 pb-2">
          <p className="text-xs leading-tight">
            Analytical, organized and detail-oriented accountant with GAAP
            expertise and experience in the full spectrum of public accounting.
            Collaborative team player with ownership mentality and a track
            record of delivering the highest quality strategic solutions to
            resolve challenges and propel business growth.
          </p>
        </div>

        <div className="mt-2 border-b-4 border-gray-300 pb-2">
          <h1 className="text-sm font-bold text-gray-600 uppercase">
            Experience
          </h1>

          <div className="mt-2">
            <h2 className="text-xs font-bold uppercase">Accountant</h2>
            <h3 className="text-xs italic">
              Trey Research | San Francisco, CA
            </h3>
            <h4 className="text-xs text-gray-500">20XX – Present</h4>
            <p className="text-xs mt-1 leading-tight">
              Working in a mid-sized public accounting firm to provide
              professional accounting services for individuals and business
              clients. Provide full range of services, including income tax
              preparation, audit support, preparation of financial statements,
              pro forma budgeting, general ledger accounting, and bank
              reconciliation.
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase">Bookkeeper</h2>
            <h3 className="text-xs italic">
              Bandter Real Estate | Berkeley, CA
            </h3>
            <h4 className="text-xs text-gray-500">20XX – 20XX</h4>
            <p className="text-xs mt-1 leading-tight">
              Inhouse bookkeeper for a real estate development company.
              Maintained financial books, tracked expenses, prepared, and
              submitted invoices, and oversaw payroll.
            </p>
          </div>

          <div className="mt-4">
            <h2 className="text-xs font-bold uppercase">Accounting Intern</h2>
            <h3 className="text-xs italic">Olson Harris Ltd. | Vallejo, CA</h3>
            <h4 className="text-xs text-gray-500">20XX – 20XX</h4>
            <p className="text-xs mt-1 leading-tight">
              Assisted senior accountants with bank reconciliations, general
              ledger entries, and trial balance preparations. Conducted accounts
              payable and receivable analysis and managed monthly closing
              processes.
            </p>
          </div>
        </div>

        <div className="mt-2 border-b-4 border-gray-300 pb-2">
          <h1 className="text-sm font-bold text-gray-600 uppercase">
            Education
          </h1>
          <div className="mt-2">
            <h2 className="text-xs font-bold uppercase">
              Bachelor of Accounting
            </h2>
            <h3 className="text-xs italic">
              University of Michigan | Ann Arbor, MI
            </h3>
            <h4 className="text-xs text-gray-500">20XX</h4>
          </div>
        </div>

        <div className="mt-2">
          <h1 className="text-sm font-bold text-gray-600 uppercase">Skills</h1>
          <ul className="list-disc list-inside mt-1 text-xs">
            <li>Financial Reporting</li>
            <li>GAAP Standards</li>
            <li>Pro Forma Budgeting</li>
            <li>General Ledger Accounting</li>
            <li>Audit Support</li>
          </ul>
        </div>
      </div>
      {/* </body> */}
    </div>
  );
}

export default Theme_1;
