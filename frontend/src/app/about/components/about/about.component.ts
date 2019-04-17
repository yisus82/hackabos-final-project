import { Component } from '@angular/core';
import { faGithub, faGithubAlt, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  title = 'Welcome to MediAddicted!!!';
  subtitle = 'This is the website for all the things you love and/or hate.';
  description = `My name is Jesús Ángel Pérez-Roca Fernández.
   I'm a full-stack developer and I love coding!!!.
   You can learn more about me in the followings sites:`;
  links = [
    {
      url: 'https://www.linkedin.com/in/jesusperezrocafernandez/',
      name: 'LinkedIn',
      icon: faLinkedin
    },
    { url: 'https://github.com/yisus82/', name: 'Github', icon: faGithub },
    { url: 'https://yisus82.github.io/', name: 'Portfolio', icon: faGithubAlt }
  ];

  contact = {
    description: 'If you want to contact me about this website you can send me an email to:',
    mail: 'adm.mediaddicted@gmail.com'
  };
}
