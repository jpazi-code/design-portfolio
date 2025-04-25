import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import '../styles/AboutPage.css';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <PageHeader title="About Jasmine Martha" showWorksLink={false} />

      <div className="about-content">
        <div className="profile-section">
          <div className="profile-photo">
            <img src="/about-me-photo.jpg" alt="Jasmine Martha" />
          </div>
          <div className="about-bio">
            <h2>Designer & Creative Professional</h2>
            <p>
            Hi! 

            I'm a Biochemistry student who loves to create designs whenever I can! My skills range from illustrating to making posters.
            I can also do a bit of web development. I always want to hone my work and I'm open into taking any new projects!
            </p>
          </div>
        </div>

        <div className="experience-section">
          <h2>Work Related Experiences</h2>
          
          <div className="experience-item">
            <div className="experience-header">
              <h3>Lead Generation</h3>
              <div className="experience-details">
                <span className="organization">Compound • Part-Time</span>
                <span className="duration">Aug 2024 - April 2025</span>
              </div>
            </div>
            <ul>
              <li>Studied TikTok trends to align content with viral themes</li>
              <li>Sourced TikTok creators and vetted their engagement for music promotions</li>
              <li>Contacted TikTok creators and negotiated their rates for music promotions</li>
            </ul>
          </div>

          <div className="experience-item">
            <div className="experience-header">
              <h3>Graphic Designer</h3>
              <div className="experience-details">
                <span className="organization">Freelance</span>
                <span className="duration">Sept 2023 - Current</span>
              </div>
            </div>
            <ul>
              <li>Designed various promotional materials including social media posts, reels, printed posters, and tarpaulins</li>
              <li>Created simple illustrations tailored for social media posts</li>
              <li>Developed engaging visuals to enhance brand engagement across platforms</li>
            </ul>
          </div>
        </div>

        <div className="education-section">
          <h2>Education</h2>
          
          <div className="education-item">
            <div className="education-header">
              <h3>BS Biochemistry</h3>
              <div className="education-details">
                <span className="institution">De La Salle University - Manila</span>
                <span className="duration">Sept 2023 - Current</span>
              </div>
            </div>
          </div>

          <div className="education-item">
            <div className="education-header">
              <h3>STEM Student (Senior High School)</h3>
              <div className="education-details">
                <span className="institution">De La Salle University (Integrated School Manila)</span>
                <span className="duration">Sept 2021 - Sept 2023</span>
              </div>
            </div>
            <ul>
              <li>Recipient of Bronze Award</li>
              <li>Member of Hiraya (an audio-visual arts organization) for 2 terms</li>
            </ul>
          </div>

          <div className="education-item">
            <div className="education-header">
              <h3>Junior High School Student</h3>
              <div className="education-details">
                <span className="institution">Multinational Sacred Heart School (MSHS)</span>
                <span className="duration">June 2021</span>
              </div>
            </div>
            <ul>
              <li>Recipient of "with honors" award</li>
            </ul>
          </div>
        </div>

        <div className="activities-section">
          <h2>Extracurricular Activities</h2>
          
          <div className="activity-item">
            <div className="activity-header">
              <h3>Associate Vice President (AVP) for Creatives</h3>
              <div className="activity-details">
                <span className="organization">DLSU Chemistry Society (CHEMSOC)</span>
                <span className="duration">Sept 2024 - Current</span>
              </div>
            </div>
            <ul>
              <li>Designed social media posts</li>
              <li>Created sticker merchandise</li>
              <li>Collaborated with the Marketing Committee to get the posts approved</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Trainee for the Publicity Committee</h3>
              <div className="activity-details">
                <span className="organization">Lasallian Youth Orchestra</span>
                <span className="duration">Oct 2023 - Current</span>
              </div>
            </div>
            <ul>
              <li>Created a character/mascot illustrator to be used for social media posts</li>
              <li>Designed social media posts</li>
              <li>Took photographs during an orchestra fundraising event (Forte 2024)</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Assistant Team Head for IMC-Creatives Committee</h3>
              <div className="activity-details">
                <span className="organization">Lasallian Enrichment Alternative Program (LEAP) 2025</span>
                <span className="duration">April 2025 - Current</span>
              </div>
            </div>
            <ul>
              <li>Designed merch for the event</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Volunteer for Creatives</h3>
              <div className="activity-details">
                <span className="organization">DLSU Innovation and Technology (DITECH) Fair 2025</span>
                <span className="duration">December 2024 - January 2025</span>
              </div>
            </div>
            <ul>
              <li>Conceptualized the brandbook for Arigo: Bingo Tayo, a fundraising event during the vision-mission week</li>
              <li>Created most of the social media posts for the event</li>
              <li>Assisted in the promotional materials for the other events</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Assistant Team Leader for Creatives Committee</h3>
              <div className="activity-details">
                <span className="organization">DLSU University Vision-Mission Week 2024</span>
                <span className="duration">April 2024 - May 2024</span>
              </div>
            </div>
            <ul>
              <li>Conceptualized the brandbook for Arigo: Bingo Tayo, a fundraising event during the vision-mission week</li>
              <li>Created most of the social media posts for the event</li>
              <li>Assisted in the promotional materials for the other events</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Executive for Creatives Committee</h3>
              <div className="activity-details">
                <span className="organization">Tachana 2024: Pagsasago ng mga Puso Bazaar and Fair</span>
                <span className="duration">Jan 2024 - Feb 2024</span>
              </div>
            </div>
            <ul>
              <li>Designed social media posts</li>
              <li>Created Facebook and Instagram reels</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Member of the Creatives Committee</h3>
              <div className="activity-details">
                <span className="organization">Archers Connect (Freshman Gathering)</span>
                <span className="duration">Sept 2023 - Sept 2023</span>
              </div>
            </div>
            <ul>
              <li>Designed social media posts</li>
              <li>Assisted in conceptualizing promotional ideas for the event</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Member of the Creatives Committee</h3>
              <div className="activity-details">
                <span className="organization">ViFrosh (An Unofficial Freshman Orientation)</span>
                <span className="duration">Sept 2023 - Sept 2023</span>
              </div>
            </div>
            <ul>
              <li>Designed social media posts</li>
              <li>Assisted in conceptualizing promotional ideas for the event</li>
            </ul>
          </div>

          <div className="activity-item">
            <div className="activity-header">
              <h3>Virent Arcus (E-Games Organization in SHS)</h3>
              <div className="activity-details">
                <span className="organization">Member of the Creatives Committee</span>
                <span className="duration">Nov 2022 - March 2023</span>
              </div>
            </div>
            <ul>
              <li>Designed templates and social media posts</li>
              <li>Coordinated with the heads regarding potential merch for the organization</li>
            </ul>
          </div>
        </div>

        <div className="trainings-section">
          <h2>Trainings</h2>
          
          <div className="training-item">
            <div className="training-header">
              <h3>Principles of Graphic Design</h3>
              <div className="training-details">
                <span className="institution">University of the Philippines Open University for Massive Open Online Courses (MOOCs)</span>
                <span className="duration">April 2024</span>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-section">
          <h2>Skills & Interests</h2>
          
          <div className="skill-category">
            <h3>Technical</h3>
            <p>MS Excel, MS Word, MS PowerPoint, Adobe Photoshop, Adobe Illustrator, Canva, Procreate, Notion, Slack</p>
          </div>
          
          <div className="skill-category">
            <h3>Language</h3>
            <p>Filipino and English</p>
          </div>
          
          <div className="skill-category">
            <h3>Interests</h3>
            <p>Conceptualizing various designs for made-up events and making graphic design materials</p>
          </div>
        </div>

        <div className="cta-section">
          <h2>Let's Work Together</h2>
          <p>
            I'm always excited to take on new projects and collaborate with clients who share my 
            passion for creative excellence. Whether you need a complete brand identity, 
            website design, or any other creative services, I'd love to discuss how I can help bring your vision to life.
          </p>
          <Link to="/contact" className="contact-btn">Get in Touch</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 