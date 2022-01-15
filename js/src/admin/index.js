import app from "flarum/admin/app";
import { override } from "flarum/extend";
import MailPage from "flarum/admin/components/MailPage";
import FieldSet from "flarum/common/components/FieldSet";
import Button from "flarum/common/components/Button";
import Alert from "flarum/common/components/Alert";
import LoadingIndicator from "flarum/common/components/LoadingIndicator";

app.initializers.add("luuhai48-gmail-oauth2", () => {
  app.gmailOauth2Complete = () => {
    window.location.reload();
  };

  MailPage.prototype.saveGmailOauth2Settings = function (e) {
    e.preventDefault();

    app.alerts.clear();
    this.loading = true;

    const settings = this.dirty();
    const oldSettings = JSON.parse(JSON.stringify(app.data.settings));
    Object.assign(app.data.settings, settings);

    return app
      .request({
        method: "POST",
        url: app.forum.attribute("apiUrl") + "/settings",
        body: settings,
      })
      .then(() => {
        window.location = app.forum.attribute("baseUrl") + "/gmail-oauth2";
      })
      .catch((error) => {
        app.data.settings = oldSettings;
        throw error;
      });
  };

  override(MailPage.prototype, "content", function () {
    if (this.loading) {
      return <LoadingIndicator />;
    }

    const fields = this.driverFields[this.setting("mail_driver")()];
    const fieldKeys = Object.keys(fields);

    return (
      <div className="Form">
        {this.buildSettingComponent({
          type: "text",
          setting: "mail_from",
          label: app.translator.trans("core.admin.email.addresses_heading"),
          className: "MailPage-MailSettings",
        })}
        {this.buildSettingComponent({
          type: "select",
          setting: "mail_driver",
          options: Object.keys(this.driverFields).reduce(
            (memo, val) => ({ ...memo, [val]: val }),
            {}
          ),
          label: app.translator.trans("core.admin.email.driver_heading"),
          className: "MailPage-MailSettings",
        })}
        {this.status.sending ||
          Alert.component(
            {
              dismissible: false,
            },
            app.translator.trans("core.admin.email.not_sending_message")
          )}

        {fieldKeys.length > 0 && (
          <FieldSet
            label={app.translator.trans(
              `core.admin.email.${this.setting("mail_driver")()}_heading`
            )}
            className="MailPage-MailSettings"
          >
            <div className="MailPage-MailSettings-input">
              {fieldKeys.map((field, index) => {
                const fieldInfo = fields[field];

                return [
                  this.buildSettingComponent({
                    type:
                      typeof this.setting(field)() === "string"
                        ? "text"
                        : "select",
                    label: app.translator.trans(
                      `core.admin.email.${field}_label`
                    ),
                    setting: field,
                    options: fieldInfo,
                  }),
                  this.status.errors[field] && (
                    <p className="ValidationError">
                      {this.status.errors[field]}
                    </p>
                  ),
                ];
              })}
            </div>
          </FieldSet>
        )}
        {this.setting("mail_driver")() === "gmail-oauth2" ? (
          <Button
            onclick={this.saveGmailOauth2Settings.bind(this)}
            className="Button Button--primary"
          >
            {app.translator.trans(
              `luuhai48.admin.email.gmail_oauth2_fetch_token_button`
            )}
          </Button>
        ) : (
          this.submitButton()
        )}

        <FieldSet
          label={app.translator.trans(
            "core.admin.email.send_test_mail_heading"
          )}
          className="MailPage-MailSettings"
        >
          <div className="helpText">
            {app.translator.trans("core.admin.email.send_test_mail_text", {
              email: app.session.user.email(),
            })}
          </div>
          {Button.component(
            {
              className: "Button Button--primary",
              disabled: this.sendingTest || this.isChanged(),
              onclick: () => this.sendTestEmail(),
            },
            app.translator.trans("core.admin.email.send_test_mail_button")
          )}
        </FieldSet>
      </div>
    );
  });
});
