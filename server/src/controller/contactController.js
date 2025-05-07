import { Contact } from "../model/contactModel.js";
import mongoose from 'mongoose';


export const contactUs = async (req, res) => {
  
  try {
    const { userId, lastname, firstname, message } = req.body;
    
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid or missing userId' });
  }

    if (!userId || !lastname.trim() === '' || !firstname.trim() === '' || !message.trim() === '') {
      res.status(400).json({ success: false, message: 'Please fill the empty fields and try again!' })
    }
    const contact = new Contact({userId, lastname, firstname,message });
    await contact.save();

    // Nodemailer setup
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.ADMIN_EMAIL,
    //     pass: process.env.ADMIN_PASS
    //   }
    // });
    // await transporter.sendEmail({
    //   from: email,
    //   to: process.env.ADMIN_EMAIL,
    //   subject: 'New Mail from Contact Form',
    //   html:
    //     `<p>
    //     <strong>Lastname:<strong> ${lastname}
    //     </p>
    //     <p>
    //     <strong>Firstname:<strong> ${firstname}
    //     </p>
    //     <p>
    //     <strong>Email:<strong> ${email}
    //     </p>
    //     <p>
    //     <strong>Message:<strong> ${message}
    //     </p>
    //     `
    // });
    res.status(200).json({success: true, message: 'Message Sent Successfully'})
  } catch (error) {
    console.log(error)
    res.status(500);
  }

}

export const getAllContactUs = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('userId','firstname phone email message');
    res.status(200).json({message: true, contacts})
  } catch (error) {
    console.log(error)
    res.status(500).json({error:error.message})
  }
}

export default { contactUs, getAllContactUs }