const { DateTime } = require('luxon');

export function run() {

    // Get the current date and time
    const now = DateTime.now();

    // Format the date in various USA-specific formats
    const usDateShort = now.toLocaleString(DateTime.DATE_SHORT, { locale: 'en-US' });
    const usDateFull = now.toLocaleString(DateTime.DATE_FULL, { locale: 'en-US' });
    const usDateTimeShort = now.toLocaleString(DateTime.DATETIME_SHORT, { locale: 'en-US' });
    const usDateTimeFull = now.toLocaleString(DateTime.DATETIME_FULL, { locale: 'en-US' });

    // Print the formatted dates
    console.log('Short Date:', usDateShort);
    console.log('Full Date:', usDateFull);
    console.log('Short Date and Time:', usDateTimeShort);
    console.log('Full Date and Time:', usDateTimeFull);

    // Example of parsing a specific date and formatting it
    const specificDate = DateTime.fromISO('2023-07-21T14:30:00', { zone: 'America/New_York' });
    console.log('\nSpecific Date (Short):', specificDate.toLocaleString(DateTime.DATE_SHORT, { locale: 'en-US' }));
    console.log('Specific Date (Full):', specificDate.toLocaleString(DateTime.DATETIME_FULL, { locale: 'en-US' }));


}