import { UserService } from '../../user/services/user.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  messages: string[] = [];
  newMessage: string = '';

  constructor(private autoReplyService: UserService) {}

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const userMessage = this.newMessage;
      this.messages.push(`You: ${userMessage}`);

      // احصل على رد تلقائي وأضفه إلى المحادثة
      const autoReply = this.autoReplyService.getAutoReply(userMessage);
      this.messages.push(`Bot: ${autoReply}`);

      this.newMessage = '';
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show/hide the scroll-to-top button based on the scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollButton = document.querySelector('.scroll-to-top') as HTMLElement;

    if (scrollPosition > 500) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  }
  
}
