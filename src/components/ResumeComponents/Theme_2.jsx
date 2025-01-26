import React from "react";

const Theme_2 = () => {
  return (
    <div className="bg-white text-black p-4 max-w-4xl mx-auto border border-gray-300 rounded-lg print:block">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Danielle Brasseur</h1>
        <p className="text-sm">
          4567 8<sup>th</sup> Avenue, Carson City, NV 10111 | (313) 555-0100 | danielle@example.com | www.linkedin.com
        </p>
      </header>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Summary</h2>
        <p className="text-sm">
          Dynamic and detail-oriented accountant with expertise in GAAP and comprehensive public accounting experience. Known for delivering
          top-notch strategic solutions and fostering business growth through effective collaboration and ownership mentality.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Education</h2>
        <div>
          <h3 className="text-base font-semibold">Bachelor of Science in Accounting, Minor in Business Administration</h3>
          <p className="text-sm">Bellows College, Degree obtained June 20XX</p>
          <ul className="list-disc list-inside text-sm">
            <li>Distinguished member of university’s Accounting Society, GPA: 3.8</li>
            <li>Relevant coursework: Advanced Financial Accounting and Reporting</li>
          </ul>
        </div>
      </section>

      <section className="mb-4">
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h2>
        <div className="mb-3">
          <h3 className="text-base font-semibold">Accountant | Trey Research</h3>
          <p className="text-sm">San Francisco, CA | March 20XX – Present</p>
          <ul className="list-disc list-inside text-sm">
            <li>Provide accounting services for individuals and businesses in a mid-sized firm</li>
            <li>Specialize in income tax preparation, audit support, and financial statement preparation</li>
            <li>Manage pro forma budgeting, general ledger accounting, and bank reconciliation</li>
          </ul>
        </div>

        <div className="mb-3">
          <h3 className="text-base font-semibold">Bookkeeper | Bandter Real Estate</h3>
          <p className="text-sm">Berkeley, CA | May 20XX – February 20XX</p>
          <ul className="list-disc list-inside text-sm">
            <li>In-house bookkeeper for a real estate development company</li>
            <li>Maintained financial books, tracked expenses</li>
            <li>Prepared and submitted invoices</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-semibold">Accounting Intern | Olson Harris Ltd.</h3>
          <p className="text-sm">Vallejo, CA | December 20XX – April 20XX</p>
          <ul className="list-disc list-inside text-sm">
            <li>Assisted with payroll and pensions service management for 150+ employees</li>
            <li>Prepared invoices for more than 200 clients</li>
            <li>Assisted with bill payments, records organization, and other office duties</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <ul className="list-disc list-inside">
            <li>Microsoft NAV Dynamics</li>
            <li>Cashflow planning & management</li>
            <li>State & federal tax codes</li>
          </ul>
          <ul className="list-disc list-inside">
            <li>Bookkeeping</li>
            <li>Exceptional communication</li>
            <li>Fluent in German</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Theme_2;
