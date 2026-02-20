'use client'

const writeKey = process.env.NEXT_PUBLIC_CUSTOMERIO_WRITE_KEY ?? ''

export function CustomerIOProvider() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `!function(){var analytics=window.cioanalytics=window.cioanalytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Customer.io snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window.cioanalytics.initialized)return window.cioanalytics[e].apply(window.cioanalytics,arguments);var n=Array.prototype.slice.call(arguments);n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdp.customer.io/v1/analytics-js/snippet/"+key+"/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="${writeKey}";analytics.SNIPPET_VERSION="0.0.1";analytics.load("${writeKey}");analytics.page();}}();`
      }}
    />
  )
}
