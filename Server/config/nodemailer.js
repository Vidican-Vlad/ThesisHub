import nodemailer from "nodemailer"


let transport = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "17b9cedcf14808",
		pass: "ac244cf346b3db",
	},
});

const style = '<div style="background-color:grey;text-align:center;padding:10px 10px 10px 10px;color:white;">'

function baseSendMail(to, subject, html){
	try {
		transport.sendMail({
			from: `ThesisHub staff <smtp.mailtrap.io>`,
			to: to,
			subject: subject,
			text: "",
			html: html,
		});
	} catch (error) {
		console.log(err);
	}
}


const sendWelcomeEmail = (mail, name, token) => {
	const html = `
	${style}
		<h3> Hello ${name} <h3>
		<p>in order to continue with the onboarding process you must use this keycode: ${token} to confirm your registration request</p>
		<p>soon after that the registration request will be validated by one of our administrators and that will conclude the onboarding process</p>
		<p>kind regards, the ThesisHub Staff</p>
	</div>`;
	 baseSendMail(mail, "Welcome to ThesisHub", html );
	//"
};

const sendTokenReset = async (mail, name, token) => {
	const html = `
	${style}
		<h3> Hello ${name} <h3>
		<p>following your reset request, here is the new confirmation token: ${token}</p>
		<p>kind regards, the ThesisHub Staff</p>
		</div>`;
	baseSendMail(mail, "New security token", html);
};

const accountValidated = async (mail, name) => {

	const html = `
	${style}
		<h3> Hello ${name} <h3>
		<p>Great news, your onboarding was complete</p>
		<p>kind regards, the ThesisHub Staff</p>
	</div>`;
	baseSendMail(mail, "Onboarding complete :)", html );
};

const accountRejected = (mail, name, rejectMessage) => {

	const html = `
	${style}
		<h3> Hello ${name} <h3>
		<p>Unfortunately, after their reviewal, one of our administrators has decided to reject your request</p>
		<p>below you can find the reasoning provided by the administrator:</p>
		<p>${rejectMessage}</p>
		<p>please take the feedback into consideration and try again</p>
		<p>kind regards, the ThesisHub Staff</p>
	</div>`;
	baseSendMail(mail, "Rejected onboarding :(", html);
	//"Rejected onboarding :("
};

export {sendWelcomeEmail, sendTokenReset, accountValidated, accountRejected};