module.exports=function(t){var e={};function a(n){if(e[n])return e[n].exports;var i=e[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=t,a.c=e,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="",a(a.s=7)}([function(t,e){t.exports=flarum.core.compat["admin/app"]},function(t,e){t.exports=flarum.core.compat["admin/components/MailPage"]},function(t,e){t.exports=flarum.core.compat["common/components/FieldSet"]},function(t,e){t.exports=flarum.core.compat["common/components/Button"]},function(t,e){t.exports=flarum.core.compat.extend},function(t,e){t.exports=flarum.core.compat["common/components/Alert"]},function(t,e){t.exports=flarum.core.compat["common/components/LoadingIndicator"]},function(t,e,a){"use strict";function n(){return(n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}a.r(e);var i=a(0),r=a.n(i),o=a(4),s=a(1),l=a.n(s),u=a(2),c=a.n(u),d=a(3),p=a.n(d),f=a(5),g=a.n(f),h=a(6),b=a.n(h);r.a.initializers.add("luuhai48-gmail-oauth2",(function(){r.a.gmailOauth2Complete=function(){window.location.reload()},l.a.prototype.saveGmailOauth2Settings=function(t){t.preventDefault(),r.a.alerts.clear(),this.loading=!0;var e=this.dirty(),a=JSON.parse(JSON.stringify(r.a.data.settings));return Object.assign(r.a.data.settings,e),r.a.request({method:"POST",url:r.a.forum.attribute("apiUrl")+"/settings",body:e}).then((function(){window.location=r.a.forum.attribute("baseUrl")+"/gmail-oauth2"})).catch((function(t){throw r.a.data.settings=a,t}))},Object(o.override)(l.a.prototype,"content",(function(){var t=this;if(this.loading)return m(b.a,null);var e=this.driverFields[this.setting("mail_driver")()],a=Object.keys(e);return m("div",{className:"Form"},this.buildSettingComponent({type:"text",setting:"mail_from",label:r.a.translator.trans("core.admin.email.addresses_heading"),className:"MailPage-MailSettings"}),this.buildSettingComponent({type:"select",setting:"mail_driver",options:Object.keys(this.driverFields).reduce((function(t,e){var a;return n({},t,((a={})[e]=e,a))}),{}),label:r.a.translator.trans("core.admin.email.driver_heading"),className:"MailPage-MailSettings"}),this.status.sending||g.a.component({dismissible:!1},r.a.translator.trans("core.admin.email.not_sending_message")),a.length>0&&m(c.a,{label:r.a.translator.trans("core.admin.email."+this.setting("mail_driver")()+"_heading"),className:"MailPage-MailSettings"},m("div",{className:"MailPage-MailSettings-input"},a.map((function(a,n){var i=e[a];return[t.buildSettingComponent({type:"string"==typeof t.setting(a)()?"text":"select",label:r.a.translator.trans("core.admin.email."+a+"_label"),setting:a,options:i}),t.status.errors[a]&&m("p",{className:"ValidationError"},t.status.errors[a])]})))),"gmail-oauth2"===this.setting("mail_driver")()?m(p.a,{onclick:this.saveGmailOauth2Settings.bind(this),className:"Button Button--primary"},r.a.translator.trans("luuhai48.admin.email.gmail_oauth2_fetch_token_button")):this.submitButton(),m(c.a,{label:r.a.translator.trans("core.admin.email.send_test_mail_heading"),className:"MailPage-MailSettings"},m("div",{className:"helpText"},r.a.translator.trans("core.admin.email.send_test_mail_text",{email:r.a.session.user.email()})),p.a.component({className:"Button Button--primary",disabled:this.sendingTest||this.isChanged(),onclick:function(){return t.sendTestEmail()}},r.a.translator.trans("core.admin.email.send_test_mail_button"))))}))}))}]);
//# sourceMappingURL=admin.js.map