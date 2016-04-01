import bookshelf from 'models/base';
import Bcrypt from 'bcrypt';
import Promise from 'bluebird';

let bcrypt = Promise.promisifyAll(Bcrypt);


let User = bookshelf.Model.extend({
    tableName: 'users',
    hidden: ['passwordDigest'],
    virtuals: {
        fullname: function(){
            return `${this.get('firstName')} ${this.get('lastName')}`
        }
    }
},
{
    login: Promise.method(function (email, password){
        if(!email && !password){
            throw new Error('Email and password are required to login');
        }
        let cleanEmail = email.toLowerCase().trim();
        return new this({email:cleanEmail}).fetch({require:true}).tap(user => {
            return bcrypt.compareAsync(user.get('passwordDigest'), password).then(res => {
                if(!res) throw new Error('Invalid password');
            })
        })
    }),
    newUser: function(){
        return new this();
    }
});
/*
User.on('creating', function(model, attrs){
    bcrypt.genSalt(10).then(salt => {
       return bcrypt.hash(attrs.password, salt);
    }).then(hash => {
        model.set('email', attrs.email.toLowerCase().trim());
        model.set('passwordDigest', hash);
        return true;
    });
});
*/


export default bookshelf.model('User', User);

