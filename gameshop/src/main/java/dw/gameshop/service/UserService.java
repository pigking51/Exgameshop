package dw.gameshop.service;

import dw.gameshop.dto.UserDto;
import dw.gameshop.model.Authority;
import dw.gameshop.model.User;
import dw.gameshop.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserService {
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public List<User> getAllUsers(){return userRepository.findAll();}

    public String saveUser(UserDto userDto) {
        Optional<User> userOptional = userRepository.findByUserId(userDto.getUserId());
        if(userOptional.isPresent()){
            return "이미 등록된 아이디입니다.";
        }
        Authority authority = new Authority();
        authority.setAuthorityName("ROLE_USER");
        User user = new User(userDto.getUserId(),
                userDto.getUserName(),
                userDto.getUserEmail(),
                bCryptPasswordEncoder.encode(userDto.getPassword()),
                authority,
                LocalDateTime.now());
        // 위에꺼 설정할때 table과의 순서 맞는지 확인!!
        // → 안하면 lombok에서 인식할때 오류생김
        return userRepository.save(user).getUserId();
    }

//    public List<User> getUsersBySession(UserDto userDto)
//    {
//       return userRepository.findAll().stream().filter((e) ->
//               e.getUserId().equals(userDto.getUserId())).collect(Collectors.toList());}

//    public String getUserName(UserDto userDto) {
//        Optional<User> user = userRepository.findByUserName(userDto.getUserId());
//        User getAuthority = new User();
//        String name = "";
//        if (user.isPresent()) {
//            return user.get().getUsername();
//        } else if (getAuthority.getAuthority().toString().equals("ROLE_ADMIN")) {
//            return name = "관리자";
//        } else if (getAuthority.getAuthority().toString().equals("ROLE_USER")) {
//            return name = "회원";
//        }
//        return name;

//    }
}
